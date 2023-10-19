import { Client } from 'pg';
import 'dotenv/config';

const dbClient = new Client({
	user: 'postgres',
	host: 'localhost',
	database: 'postgres',
	password: process.env.DATABASE_PASSWORD,
	port: 5432,
});

export default dbClient;
