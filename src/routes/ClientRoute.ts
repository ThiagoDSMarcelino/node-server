import ClientService from '../services/ClientService';
import container from '../container';
import { Router } from 'express';

const ClientRoute = Router();

ClientRoute.get('/', async (_, res) => {
	try {
		const service = container.resolve<ClientService>('clientService');
		const data = await service.list();
		return res.status(200).json(data);
	} catch (error) {
		console.error(error);
		return res.status(500).send('Internal Server Error');
	}
});

export default ClientRoute;
