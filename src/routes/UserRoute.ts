import { Router } from 'express';

import container from '../config/container';
import IUserRepository from '../interfaces/IUserRepository';
import authHandler from '../middleware/authHandler';
import CreateUser from '../models/User/CreateUser';
import UserLogin from '../models/User/UserLogin';

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

// Login
UserRoute.post('/login', async (req, res, next) => {
	const data: UserLogin = req.body;

	try {
		const token = await controller.login(data);

		return res.status(200).json(token);
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
UserRoute.post('/id', authHandler, async (req, res, next) => {
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
