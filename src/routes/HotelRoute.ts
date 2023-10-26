import HotelController from '../controllers/HotelController';
import container from '../container';
import { Router } from 'express';

const ClientRoute = Router();

ClientRoute.get('/', async (_, res) => {
	try {
		const service = container.resolve<HotelController>('hotelController');
		const data = await service.getAll();
		return res.status(200).json(data);
	} catch (error) {
		console.error(error);
		return res.status(500).send('Internal Server Error');
	}
});

ClientRoute.get('/:id', async (req, res) => {
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

ClientRoute.delete('/', async (req, res) => {
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

// ClientRoute.put('/', async (req, res) => {
// 	const { hotel } = req.body;

// 	try{
// 		const service = container.resolve<HotelController>('hotelController')
// 		const data = await service.update(hotel);
// 		return res.status(200).json(data);
// 	} catch(error) {
// 		console.log(error)
// 		return res.status(500).send("Failed to update hotel")
// 	}
// })

export default ClientRoute;
