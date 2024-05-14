import { EntitySchema } from "typeorm";

export const OrderSchema = new EntitySchema({

    name: "order",
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },
        date: {
            type: Date,
        },
        price: {
            type: 'decimal', 
            precision: 10,
            scale: 2, 
        },
        discount:{
            type: 'decimal', 
            precision: 10, 
            scale: 2, 
        }
    },
    relations: {
        user: {
            type: 'many-to-one',
            target: 'user',
            inverseSide: 'order',
        },
        order_game:{
            type: 'one-to-many',
            target: 'order_game',
            inverseSide: 'order',
        }
    },

})