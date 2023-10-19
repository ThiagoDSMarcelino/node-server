import configureRoutes from './routes';
import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import dbClient from './db';

const app = express();

app.use(cors());

dbClient
	.connect()
	.then(() => console.log('Conectado ao PostgreSQL'))
	.catch((err) => console.error('Erro de conexão:', err));

configureRoutes(app);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on http://localhost:${port}/`));
