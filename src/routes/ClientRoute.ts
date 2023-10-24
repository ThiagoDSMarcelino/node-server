import ClientService from '../services/ClientService';
import { Router } from 'express';

const ClientRoute = Router();

ClientRoute.get('/', async (req, res) => {
	try {
		const service = req.container.resolve<ClientService>('clientService');
		const data = await service.list();
		return res.status(200).json(data);
	} catch (error) {
		console.error(error);
		return res.status(500).send('Internal Server Error');
	}
});

export default ClientRoute;
