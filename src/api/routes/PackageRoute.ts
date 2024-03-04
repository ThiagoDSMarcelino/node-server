import { Router } from 'express';

import { Package, Purchase, User } from '@prisma/client';

import container from '../../config/container';
import IPackageService from '../../interfaces/Base/IPackageService';
import IPurchaseService from '../../interfaces/Base/IPurchaseService';
import authHandler from '../middleware/authHandler';

const PackageRoute = Router();
const service = container.resolve<IPackageService>('packageService');

// Create
PackageRoute.post('/', authHandler, async (req, res, next) => {
	try {
		const obj: Package = req.body;
		const user: User = res.locals.user;
		const created: Package = await service.create(obj, user);
		return res.status(201).json(created);
	} catch (error) {
		next(error);
	}
});

// List
PackageRoute.get('/', async (_, res, next) => {
	try {
		const packages: Package[] = await service.list();
		return res.status(200).json(packages);
	} catch (error) {
		next(error);
	}
});

// Delete
PackageRoute.delete('/:id', authHandler, async (req, res, next) => {
	try {
		const id: number = parseInt(req.params.id);
		const user: User = res.locals.user;
		const deleted: Package = await service.delete(id, user);
		return res.status(200).json(deleted);
	} catch (error) {
		next(error);
	}
});

export default PackageRoute;
