import { DataSource } from "typeorm";

export const dataSource = new DataSource({

    database: "sce",
    entities: ["postgresql/schemas/*.js"],
    host: "localhost",
    password: "sce",
    migrations: ["postgresql/migrations/*.js"],
    port: 5432,
    type: "postgres",
    username: "postgres"
})