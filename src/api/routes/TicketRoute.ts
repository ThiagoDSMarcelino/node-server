import { Router } from 'express';

import { Ticket, User } from '@prisma/client';

import container from '../../config/container';
import ITicketService from '../../interfaces/Base/ITicketService';
import authHandler from '../middleware/authHandler';

const TicketRoute = Router();
const service = container.resolve<ITicketService>('ticketService');

// Create
TicketRoute.post('/', authHandler, async (req, res, next) => {
	try {
		const ticket: Ticket = req.body;
		const user: User = res.locals.user;
		const created: Ticket = await service.create(ticket, user);
		return res.status(201).json(created);
	} catch (error) {
		next(error);
	}
});

// List
TicketRoute.get('/', async (_, res, next) => {
	try {
		const rooms: Ticket[] = await service.list();
		return res.status(200).json(rooms);
	} catch (error) {
		next(error);
	}
});

// Delete
TicketRoute.delete('/:id', authHandler, async (req, res, next) => {
	try {
		const id: number = parseInt(req.params.id);
		const user: User = res.locals.user;
		const deleted: Ticket = await service.delete(id, user);
		return res.status(200).json(deleted);
	} catch (error) {
		next(error);
	}
});

// Classes
TicketRoute.get('/classes', async (_, res, next) => {
	try {
		const classes = await service.classes();
		return res.status(200).json(classes);
	} catch (error) {
		next(error);
	}
});

// Types
TicketRoute.get('/types', async (_, res, next) => {
	try {
		const types = await service.types();
		return res.status(200).json(types);
	} catch (error) {
		next(error);
	}
});

export default TicketRoute;
