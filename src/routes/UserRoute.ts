import { Router } from 'express';

import container from '../config/container';
import IUserRepository from '../interfaces/IUserRepository';
import authHandler from '../middleware/authHandler';
import CreateUser from '../models/User/CreateUser';

const UserRoute = Router();
const controller = container.resolve<IUserRepository>('userController');

// Create
UserRoute.post('/', async (req, res, next) => {
	const user: CreateUser = req.body;

	try {
		const data = await controller.create(user);

		return res.status(201).json(data);
	} catch (error) {
		next(error);
	}
});

// Get all
UserRoute.get('/', async (_, res, next) => {
	try {
		const data = await controller.getAll();

		return res.status(201).json(data);
	} catch (error) {
		next(error);
	}
});

// Get by ID
UserRoute.post('/id', async (req, res, next) => {
	const { token } = req.body;

	try {
		const data = await controller.getById(token);

		return res.status(201).json(data);
	} catch (error) {
		next(error);
	}
});

// Delete
UserRoute.delete('/', authHandler, async (req, res, next) => {
	const { token } = req.body;

	try {
		const data = await controller.delete(token);

		return res.status(201).json(data);
	} catch (error) {
		next(error);
	}
});

export default UserRoute;
