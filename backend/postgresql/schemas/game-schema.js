import { EntitySchema } from "typeorm";

export const GameSchema = new EntitySchema({

    name: "game",
    columns: {
        id: {
            type: Number,
            primary: true,
        },
        name: {
            type: String,
        },
        description:{
            type: String
        },
        category:{
            type: String
        },
        price:{
            type: 'decimal', 
            precision: 10, 
            scale: 2, 
        }

        
    },
    relations: {
        order_game:{
            type: 'one-to-many',
            target: 'order_game',
            inverseSide: 'game',
        }
    }
 
})