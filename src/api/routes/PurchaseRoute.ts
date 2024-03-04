import { Router } from 'express';

import { Purchase, User } from '@prisma/client';

import container from '../../config/container';
import IPurchaseService from '../../interfaces/Base/IPurchaseService';
import authHandler from '../middleware/authHandler';

const PurchaseRoute = Router();
const service = container.resolve<IPurchaseService>('purchaseService');

// Create
PurchaseRoute.post('/', authHandler, async (req, res, next) => {
	try {
		const purchase: Purchase = req.body;
		const user: User = res.locals.user;
		const created: Purchase = await service.create(purchase, user);
		return res.status(201).json(created);
	} catch (error) {
		next(error);
	}
});

// List
PurchaseRoute.get('/', async (_, res, next) => {
	try {
		const purchases: Purchase[] = await service.list();
		return res.status(200).json(purchases);
	} catch (error) {
		next(error);
	}
});

// Delete
PurchaseRoute.delete('/:id', authHandler, async (req, res, next) => {
	try {
		const id: number = parseInt(req.params.id);
		const user: User = res.locals.user;
		const deleted: Purchase = await service.delete(id, user);
		return res.status(200).json(deleted);
	} catch (error) {
		next(error);
	}
});

// Status
PurchaseRoute.get('/status', async (_, res, next) => {
	try {
		const status = await service.status();
		return res.status(200).json(status);
	} catch (error) {
		next(error);
	}
});

export default PurchaseRoute;
