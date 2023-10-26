import UserController from '../controllers/UserController';
import container from '../container';
import { Router } from 'express';

const ClientRoute = Router();

ClientRoute.get('/', async (_, res) => {
	try {
		const service = container.resolve<UserController>('userController');
		const data = await service.getAll();
		return res.status(200).json(data);
	} catch (error) {
		console.error(error);
		return res.status(500).send('Internal Server Error');
	}
});

ClientRoute.post('/', async (req, res) => {
	const user = req.body;
	try {
		const service = container.resolve<UserController>('userController');
		const data = await service.create(user);
		return res.status(201).json(data);
	} catch (error) {
		console.log(error);
		return res.status(500).send('Failed to create user');
	}
});

export default ClientRoute;
