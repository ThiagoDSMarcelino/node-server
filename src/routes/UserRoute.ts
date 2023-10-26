import { Router } from 'express';

import container from '../container';
import IUserRepository from '../interfaces/IUserRepository';

const UserRoute = Router();

UserRoute.post('/', async (req, res) => {
	const user = req.body;

	try {
		const service = container.resolve<IUserRepository>('userController');
		const data = await service.create(user);

		return res.status(201).json(data);
	} catch (error) {
		console.log(error);
		return res.status(500).send('Failed to create user');
	}
});

UserRoute.get('/', async (_, res) => {
	try {
		const service = container.resolve<IUserRepository>('userController');
		const data = await service.getAll();

		return res.status(201).json(data);
	} catch (error) {
		console.log(error);
		return res.status(500).send('Failed to create user');
	}
});

export default UserRoute;
