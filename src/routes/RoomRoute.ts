import { Router } from 'express';

import container from '../container';
import RoomController from '../controllers/RoomController';
import SearchRoom from '../models/Room/SearchRoom';

const RoomRoute = Router();

RoomRoute.get('/', async (_, res) => {
	try {
		const service = container.resolve<RoomController>('roomController');
		const data = await service.getAll();

		return res.status(200).json(data);
	} catch (error) {
		console.log(error);
		return res.status(500).send('Internal Server Error');
	}
});

RoomRoute.get('/filtered', async (req, res) => {
	const filters: SearchRoom = req.body;

	try {
		const service = container.resolve<RoomController>('roomController');
		const data = await service.getFiltered(filters);
	} catch (error) {
		console.log(error);
		return res.status(500).send('Room not found');
	}
});

RoomRoute.get('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const service = container.resolve<RoomController>('roomController');
		const data = await service.getById(Number(id));
		return res.status(200).json(data);
	} catch (error) {
		console.log(error);
		return res.status(500).send('No room found');
	}
});

RoomRoute.get('getByHotel/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const service = container.resolve<RoomController>('roomController');
		const data = await service.getByHotel(Number(id));
		return res.status(200).json(data);
	} catch (error) {
		console.log(error);
		return res.status(500).send('Room not found');
	}
});

RoomRoute.post('/', async (req, res) => {
	const room = req.body;

	try {
		const service = container.resolve<RoomController>('roomController');
		const data = await service.create(room);
		return res.status(201).json(data);
	} catch (error) {
		console.log(error);
		return res.status(500).send('Failed to create Room');
	}
});

export default RoomRoute;
