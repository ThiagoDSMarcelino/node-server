import { Router } from 'express';

import { CreditCard, User } from '@prisma/client';

import container from '../../config/container';
import ICreditCardService from '../../interfaces/Base/ICreditCardService';
import authHandler from '../middleware/authHandler';

const CreditCardRoute = Router();
const service = container.resolve<ICreditCardService>('creditCardService');

// Create
CreditCardRoute.post('/', authHandler, async (req, res, next) => {
	try {
		const card: CreditCard = req.body;
		const user: User = res.locals.user;
		const created: CreditCard = await service.create(card, user);
		return res.status(201).json(created);
	} catch (error) {
		next(error);
	}
});

// Delete
CreditCardRoute.delete('/:id', authHandler, async (req, res, next) => {
	try {
		const id: number = parseInt(req.params.id);
		const user: User = res.locals.user;
		const deleted: CreditCard = await service.delete(id, user);
		return res.status(200).json(deleted);
	} catch (error) {
		next(error);
	}
});

export default CreditCardRoute;
