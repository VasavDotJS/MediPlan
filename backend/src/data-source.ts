import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./models/User";
import { Appointment } from "./models/Appointment";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "mediplan",
    synchronize: true, // Set to false in production
    logging: false,
    entities: [User, Appointment],
    migrations: [],
    subscribers: [],
});
