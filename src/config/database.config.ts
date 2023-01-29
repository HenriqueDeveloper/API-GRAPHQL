import { DataSource, DataSourceOptions } from "typeorm";
require('dotenv').config();

const databaseConfig: DataSourceOptions = {
    name: "default",
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: parseInt(<string>process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    entities: ["dist/entities/*entity{.ts,.js}"],
    migrations: ["dist/migrations/*{.ts,.js}"],
    synchronize: true,
    logging: true,
}

export default databaseConfig
