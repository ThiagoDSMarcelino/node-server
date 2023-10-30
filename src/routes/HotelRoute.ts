import { Router } from 'express';

import container from '../config/container';
import HotelController from '../controllers/HotelController';
import IHotelController from '../interfaces/IHotelController';

const HotelRoute = Router();

HotelRoute.get('/', async (_, res) => {
	try {
		const service = container.resolve<IHotelController>('hotelController');
		const data = await service.getAll();

		return res.status(200).json(data);
	} catch (error) {
		console.error(error);
		return res.status(500).send('Internal Server Error');
	}
});

HotelRoute.get('/:id', async (req, res) => {
	const { id } = req.params;

	try {
		const service = container.resolve<HotelController>('hotelController');
		const data = await service.getByID(Number(id));

		return res.status(200).json(data);
	} catch (error) {
		console.log(error);
		return res.status(500).send('No hotel found');
	}
});

HotelRoute.post('/', async (req, res) => {
	const hotel = req.body;

	try {
		const service = container.resolve<HotelController>('hotelController');
		const data = await service.create(hotel);

		return res.status(201).json(data);
	} catch (error) {
		console.log(error);
		return res.status(500).send('Failed to create hotel');
	}
});

HotelRoute.put('/', async (req, res) => {
	const hotel = req.body;

	try {
		const service = container.resolve<HotelController>('hotelController');
		const data = await service.update(hotel);

		return res.status(200).json(data);
	} catch (error) {
		console.log(error);
		return res.status(500).send('Failed to update hotel');
	}
});

HotelRoute.delete('/', async (req, res) => {
	const { id } = req.body;

	try {
		const service = container.resolve<HotelController>('hotelController');
		const data = await service.delete(Number(id));

		return res.status(200).json(data);
	} catch (error) {
		console.log(error);
		return res.status(500).send('Failed to delete hotel');
	}
});

export default HotelRoute;
