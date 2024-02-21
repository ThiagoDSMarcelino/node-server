import { Router } from 'express';

import container from '../config/container';
import IUserController from '../interfaces/IUserController';
import authHandler from '../middleware/authHandler';
import CreateUser from '../models/User/CreateUser';

const UserRoute = Router();
const controller = container.resolve<IUserController>('userController');

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

// List
UserRoute.get('/', async (_, res, next) => {
	try {
		const data = await controller.getAll();

		return res.status(201).json(data);
	} catch (error) {
		next(error);
	}
});

// Get by id
UserRoute.get('/:id', async (req, res, next) => {
	const { id } = req.params;

	try {
		const data = await controller.getById(id);

		return res.status(201).json(data);
	} catch (error) {
		next(error);
	}
});

// Delete
UserRoute.delete('/id', authHandler, async (req, res, next) => {
	const { id } = req.params;

	try {
		const data = await controller.delete(id);

		return res.status(201).json(data);
	} catch (error) {
		next(error);
	}
});

export default UserRoute;
