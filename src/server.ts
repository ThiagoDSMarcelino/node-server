import { PrismaClient } from '@prisma/client';
import configureRoutes from './routes';
import express from 'express';
import 'dotenv/config';
import cors from 'cors';

const app = express();

app.use(cors());

configureRoutes(app);

const prisma = new PrismaClient();

async function main() {
	const user = await prisma.user.create({
		data: {
			name: 'Test',
			email: 'teste@email.com',
		},
	});

	console.log(user);
}

main()
	.then(async () => {
		console.log('Work it');
	})
	.catch(async (e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on http://localhost:${port}/`));
