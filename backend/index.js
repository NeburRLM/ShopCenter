import express from 'express';
import { dataSource } from './postgresql/data-source.js';
import { UserSchema } from './postgresql/schemas/user-schema.js';
import { GameSchema } from './postgresql/schemas/game-schema.js';
import { OrderSchema } from './postgresql/schemas/order-schema.js';
import { OrderGameSchema } from './postgresql/schemas/order-game-schema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';
import stripeLib from 'stripe';
const stripe = new stripeLib('sk_test_51PFC3YRuH9XIHqRmvQDZCNz4lvBrmadFaLXNyyBXDvMXyvl6K3i9HXNkLYHNoD2cAN5JtCoDfOWLizL02p0S2Bfj00qkSj2yHf');

import { v4 as uuidv4 } from 'uuid';

const app = express()
app.use(express.json())

app.use(cookieParser())


const port = 4000

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    response.header('Access-Control-Allow-Headers', 'content-type');
    response.header('Access-Control-Allow-Credentials', 'true');
    response.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE');
    next();
});



async function hashPassword(password) {
    const saltRounds = 10;
    try {
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
    } catch (error) {
        console.error("Error hashing password:", error);
        throw error;
    }
}


async function checkUsernameExists(username) {
    const userRepository = dataSource.getRepository(UserSchema);
    const user = await userRepository.findOneBy({ username: username });
    return user;
}

async function login(username, password) {
    try {
        const userRepository = dataSource.getRepository(UserSchema);
        const existingUser = await userRepository.findOneBy({ username: username });


        if (existingUser !== null) {

            const isMatch = await bcrypt.compare(password, existingUser.password);
            if (isMatch) {

                return existingUser.id;
            } else {
                return null;
            }
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}
function transformToOrders(orderItems, orderId) {
    const orders = [];

    orderItems.forEach(item => {
        const order = {
            quantity: item.quantity,
            order: { id: orderId },
            game: { id: item.gameId }
        };
        orders.push(order);
    });

    return orders;
}


app.get('/user', async (request, response) => {
    const reposi = dataSource.getRepository(UserSchema);
    const user = await reposi.find();
    response.json(user);
})

app.get('/me', async (request, res) => {
    const token = request.cookies.auth;
    if (token === undefined) {
        res.sendStatus(401);
    } else {
        try {
            const decodeToken = jwt.verify(token, 'cacatualoca')
            const username = decodeToken.sub;
            res.json({ username: username })
        } catch (e) {

            res.sendStatus(401);
        }
    }

})

app.post('/user/register', async (req, res) => {
    const newUser = req.body;

    try {
        const userRepository = dataSource.getRepository(UserSchema);
        const usernameExists = await checkUsernameExists(newUser.username);
        if (usernameExists !== null) {

            return res.sendStatus(409);

        }
        const pass = await hashPassword(newUser.password)
        newUser.password = pass
        const uuid = uuidv4();
        newUser.id = uuid
        const user = await userRepository.save(newUser);

        res.json(user);
    } catch (error) {
        console.error("Error while saving user:", error);
        res.status(500).send("Error while saving user.");
    }
});


app.get('/game', async (request, response) => {
    const reposi = dataSource.getRepository(GameSchema);
    const game = await reposi.find();
    response.json(game);
})

app.post('/game', async (req, res) => {
    const newGame = req.body;
    const reposi = dataSource.getRepository(GameSchema);
    const game = await reposi.save(newGame);
    res.json(game);

})

app.post('/games', async (req, res) => {
    const newGame = req.body;
    const reposi = dataSource.getRepository(GameSchema);
    const game = await reposi.save(newGame);
    res.json(game);

})

app.post('/order', async (request, response) => {
    try {
        const { userId, price, orderItems } = request.body;
        const userRepository = dataSource.getRepository(UserSchema);
        const user = await userRepository.findOneBy({ username: userId });
        const reposi = dataSource.getRepository(OrderSchema);
        const orderGameRepository = dataSource.getRepository(OrderGameSchema);
        const newOrder = {
            date: new Date(),
            user: user.id,
            price: price,
            discount: 0.5
        }
        const order = await reposi.save(newOrder);
        const order_game = transformToOrders(orderItems, order.id)

        const resp = await orderGameRepository.save(order_game)

        response.send(resp);


    } catch (error) {
        console.error("Error al crear la orden:", error);
        response.status(500).json({ error: "Error al crear la orden" });
    }
});


app.get('/order/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const userRepository = dataSource.getRepository(UserSchema);
        const user = await userRepository.findOneBy({ username: id });
        const orderRepository = dataSource.getRepository(OrderSchema);
        const orders = await orderRepository.find({
            where: { user: { id: user.id } },
            relations: ["user", "order_game", "order_game.game"]
        });
        response.json(orders);
    } catch (error) {
        console.error("Error al obtener las órdenes:", error);
        response.status(500).json({ error: "Error al obtener las órdenes" });
    }
});

app.delete('/last_order', async (request, response) => {
    try {
        const orderRepository = dataSource.getRepository(OrderSchema);

        const latestOrder = await orderRepository.createQueryBuilder('order')
            .orderBy('order.id', 'DESC')
            .getOne();

        if (!latestOrder) {
            return response.status(404).json({ error: "No se encontró ningún pedido" });
        }

        const latestOrderId = latestOrder.id;
        const orderGameRepository = dataSource.getRepository(OrderGameSchema);
        const orderGamesToDelete = await orderGameRepository.find({ where: { order: { id: latestOrderId } } });
        await orderGameRepository.remove(orderGamesToDelete);
        await orderRepository.remove(latestOrder);
        response.json({ message: `Registros de OrderGameSchema con order_id ${latestOrderId} eliminados correctamente` });
    } catch (error) {
        console.error("Error al eliminar registros de OrderGameSchema:", error);
        response.status(500).json({ error: "Error al eliminar registros de OrderGameSchema" });
    }
});



app.post("/user/login", async (req, response) => {
    const { username, password } = req.body;

    try {
        const uuid = await login(username, password)
        if (uuid === null) {
            response.sendStatus(404)
        } else {

            const token = jwt.sign({ sub: username }, 'cacatualoca', { expiresIn: '3h' });

            response.cookie('auth', token, { httpOnly: true })
            response.sendStatus(204)
        }
    } catch (error) {
        response.sendStatus(500)
    }




})

app.get('/game/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const reposi = dataSource.getRepository(GameSchema);
        const game = await reposi.findOneBy({ id: id });

        if (!game) {
            return response.status(404).json({ message: 'Juego no encontrado' });
        }

        response.json(game);
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Error al obtener el juego' });
    }
});

app


app.post('/checkout', async (request, response) => {
    const sessionCreateParams = {
        payment_method_types: ["card"],
        mode: "payment",
        line_items: request.body.items.map(item => {
            return {
                price_data: {
                    currency: "eur",
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: item.priceInCents,
                },
                quantity: item.quantity,
            }
        }),
        success_url: `http://localhost:3000/Home/Success`,
        cancel_url: `http://localhost:3000/Home/Cancel`,
    }
    const session = await stripe.checkout.sessions.create(sessionCreateParams)
    response.json({ url: session.url })
})

await dataSource.initialize()

app.listen(port, async () => {
    console.log(`Listening port: ${port}`)
})