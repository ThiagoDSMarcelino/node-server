import { Router } from 'express';

import container from '../../config/container';
import IUserService from '../../interfaces/Base/IUserService';
import authHandler from '../middleware/authHandler';

const UserRoute = Router();
const service = container.resolve<IUserService>('userService');

// Create
UserRoute.post('/', async (req, res, next) => {
	try {
		const { data } = req.body;
		const created = await service.create(data);
		return res.status(201).json(created);
	} catch (error) {
		next(error);
	}
});

// Find
UserRoute.get('/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const user = await service.find(id);
		return res.status(201).json(user);
	} catch (error) {
		next(error);
	}
});

// Delete
UserRoute.delete('/:id', authHandler, async (req, res, next) => {
	try {
		const { id } = req.params;
		const deleted = await service.delete(id, res.locals.user);
		return res.status(201).json(deleted);
	} catch (error) {
		next(error);
	}
});

export default UserRoute;
