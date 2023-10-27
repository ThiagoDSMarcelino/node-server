import { Router } from 'express';

import container from '../container';
import IUserRepository from '../interfaces/IUserRepository';

const UserRoute = Router();
const controller = container.resolve<IUserRepository>('userController');

UserRoute.post('/', async (req, res, next) => {
	const user = req.body;

	try {
		const data = await controller.create(user);

		return res.status(201).json(data);
	} catch (error) {
		next(error);
	}
});

UserRoute.get('/', async (_, res, next) => {
	try {
		const data = await controller.getAll();

		return res.status(201).json(data);
	} catch (error) {
		next(error);
	}
});

UserRoute.post('/', async (req, res, next) => {
	const { token } = req.body;

	try {
		const data = await controller.getById(token);

		return res.status(201).json(data);
	} catch (error) {
		next(error);
	}
});

UserRoute.delete('/', async (req, res, next) => {
	const { token } = req.body;

	try {
		const data = await controller.delete(token);

		return res.status(201).json(data);
	} catch (error) {
		next(error);
	}
});

export default UserRoute;
