import { EntitySchema } from "typeorm";

export const UserSchema = new EntitySchema({

    name: "user",
    columns: {
        id: {
            type: String,
            primary: true,
        },
        email: {
            type: String,
        },
        username: {
            type: String
        },
        password: {
            type: String
        }
    },
    relations: {
        order: {
            type: 'one-to-many',
            target: 'order',
            inverseSide: 'user',
        },
        
       
    }


})