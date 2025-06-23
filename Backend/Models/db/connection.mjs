import { createPool } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const connection = createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "finances_db",
    port: process.env.DB_PORT || 3306,
    decimalNumbers: true
})