import mysql, { type PoolOptions } from "mysql2";

const CONFIG: PoolOptions = {
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	namedPlaceholders: true,
};

export const pool = mysql.createPool(CONFIG).promise();
