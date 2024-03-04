import { Router } from 'express';

import { Room, User } from '@prisma/client';

import container from '../../config/container';
import IRoomService from '../../interfaces/Base/IRoomService';
import authHandler from '../middleware/authHandler';

const RoomRoute = Router();
const service = container.resolve<IRoomService>('roomService');

// Validate
RoomRoute.post('/', authHandler, async (req, res, next) => {
	try {
		const room: Room = req.body;
		const user: User = res.locals.user;
		const created: Room = await service.create(room, user);
		return res.status(201).json(created);
	} catch (error) {
		next(error);
	}
});

// List
RoomRoute.get('/', async (req, res, next) => {
	try {
		const rooms: Room[] = await service.list();
		return res.status(200).json(rooms);
	} catch (error) {
		next(error);
	}
});

// Delete
RoomRoute.delete('/:id', authHandler, async (req, res, next) => {
	try {
		const id: number = parseInt(req.params.id);
		const user: User = res.locals.user;
		const deleted: Room = await service.delete(id, user);
		return res.status(200).json(deleted);
	} catch (error) {
		next(error);
	}
});

export default RoomRoute;
