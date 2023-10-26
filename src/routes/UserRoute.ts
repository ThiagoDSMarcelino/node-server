import { Router } from 'express';

import container from '../container';
import IUserRepository from '../interfaces/IUserRepository';

const UserRoute = Router();
const controller = container.resolve<IUserRepository>('userController');

UserRoute.post('/', async (req, res) => {
	const user = req.body;

	try {
		const data = await controller.create(user);

		return res.status(201).json(data);
	} catch (error) {
		console.log(error);
		return res.status(500).send('Failed to create user');
	}
});

UserRoute.get('/', async (_, res) => {
	try {
		const data = await controller.getAll();

		return res.status(201).json(data);
	} catch (error) {
		console.log(error);
		return res.status(500).send('Failed to find users');
	}
});

UserRoute.post('/', async (req, res) => {
	const { token } = req.body;

	try {
		const data = await controller.getById(token);

		return res.status(201).json(data);
	} catch (error) {
		console.log(error);
		return res.status(500).send('Failed to find user');
	}
});

UserRoute.delete('/', async (req, res) => {
	const { token } = req.body;

	try {
		const data = await controller.delete(token);

		return res.status(201).json(data);
	} catch (error) {
		console.log(error);
		return res.status(500).send('Failed to find user');
	}
});

export default UserRoute;
