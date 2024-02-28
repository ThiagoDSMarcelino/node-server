import { Router } from 'express';

import { Hotel, User } from '@prisma/client';

import container from '../../config/container';
import IHotelService from '../../interfaces/Base/IHotelService';
import authHandler from '../middleware/authHandler';

const HotelRoute = Router();
const service = container.resolve<IHotelService>('hotelService');

// Validate
HotelRoute.post('/', authHandler, async (req, res, next) => {
	try {
		const hotel: Hotel = req.body;
		const user: User = res.locals.user;
		const created: Hotel = await service.create(hotel, user);
		return res.status(201).json(created);
	} catch (error) {
		next(error);
	}
});

// List
HotelRoute.get('/', async (req, res, next) => {
	try {
		const hotels: Hotel[] = await service.list();
		return res.status(200).json(hotels);
	} catch (error) {
		next(error);
	}
});

// Delete
HotelRoute.delete('/:id', authHandler, async (req, res, next) => {
	try {
		const id: number = parseInt(req.params.id);
		const user: User = res.locals.user;
		const deleted: Hotel = await service.delete(id, user);
		return res.status(200).json(deleted);
	} catch (error) {
		next(error);
	}
});

export default HotelRoute;
