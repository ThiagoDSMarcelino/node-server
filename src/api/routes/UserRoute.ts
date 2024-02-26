import { Router } from 'express';

import container from '../../config/container';
import IUserService from '../../interfaces/Base/IUserService';
import authHandler from '../middleware/authHandler';
import CreateUser from '../models/User/CreateUser';

const UserRoute = Router();
const service = container.resolve<IUserService>('userService');

// Create
UserRoute.post('/', async (req, res, next) => {
	const user: CreateUser = req.body;
	try {
		const data = await service.create(user);

		return res.status(201).json(data);
	} catch (error) {
		next(error);
	}
});

// Get by id
UserRoute.get('/:id', async (req, res, next) => {
	const { id } = req.params;

	try {
		const data = await service.find(id);

		return res.status(201).json(data);
	} catch (error) {
		next(error);
	}
});

// Delete
UserRoute.delete('/:id', authHandler, async (req, res, next) => {
	const { id } = req.params;

	try {
		const data = await service.delete(id, res.locals.user);

		return res.status(201).json(data);
	} catch (error) {
		next(error);
	}
});

export default UserRoute;
