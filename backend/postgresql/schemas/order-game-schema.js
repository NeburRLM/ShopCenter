import { EntitySchema } from "typeorm";

export const OrderGameSchema = new EntitySchema({

    name: "order_game",
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },
        quantity:{
            type: Number,
        }
    },
    relations: {
        order: {
            type: 'many-to-one',
            target: 'order',
            inverseSide: 'order_game',
        },
       game: {
            type: 'many-to-one',
            target: 'game',
            inverseSide: 'order_game',
        },
       
    }
})