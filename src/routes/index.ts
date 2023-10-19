import express, { Express } from 'express';
import TestRoute from './TestRoute';

const configureRoutes = (app: Express): void => {
	if (!app) {
		throw new Error('Express app is required.');
	}

	app.use(express.json());
	app.use('/', TestRoute);
};

export default configureRoutes;
