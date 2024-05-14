import React from 'react';
import './CartHistory.css';
import { useState, useEffect } from 'react';


function CartItems() {
    const [username, setUsername] = useState("");
    const [userOrders, setUserOrders] = useState([]);


    const fetchUserData = async () => {

        const response = await fetch('http://localhost:4000/me', { credentials: 'include' });
        const parsedResponse = await response.json();
        setUsername(parsedResponse.username);

    }




    useEffect(() => {
        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchAllGamesData = async () => {
            try {
                const response = await fetch(`http://localhost:4000/order/${username}`, { credentials: 'include' });
                const data = await response.json();

                if (!response.ok) {
                    throw new Error('Error al obtener los datos de los juegos');
                }

                setUserOrders(data)

            } catch (error) {
                console.error(error);
                alert('Hubo un error al obtener los datos de los juegos');
            }
        };

        if (username) {
            fetchAllGamesData();
        }
    }, [username]);


    return (
        <div className='cartitems'>
            <h1>Hi {username}, your history orders are:</h1>

            {userOrders.map(order => (
                <div key={order.id} className="order">
                    <div className="order-header">
                        <div className="order-details">
                            <p><strong>Order ID:</strong> {order.id}</p>
                            <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                        </div>
                        <div className="order-total">
                            <p><strong>Total:</strong> {order.price}€</p>
                        </div>
                    </div>
                    <hr />
                    <div className="order-products">
                        {order.order_game && order.order_game.map(game => (
                            <div key={game.game.id} className="order-product">
                                <img src={`../product_${game.game.id}.png`} alt={game.game.name} className='carticon-product-icon-small' />
                                <div className="order-product-info">
                                    <p><strong>Name:</strong> {game.game.name}</p>
                                    <p><strong>Category:</strong> {game.game.category}</p>
                                    <p><strong>Price:</strong> {(game.game.price * 0.50).toFixed(2)}€</p>
                                </div>
                                <div className="order-product-quantity">
                                    <p><strong>Quantity:</strong> x{game.quantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );

}

export default CartItems;