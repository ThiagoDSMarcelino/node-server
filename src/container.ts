import { createContainer, asFunction, asValue, asClass } from 'awilix';
import ClientController from './controllers/ClientController';
import express from 'express';
import db from './db';

const container = createContainer();

container.register({
	app: asValue(express()),
	prisma: asFunction(db).singleton(),
	clientController: asClass(ClientController).scoped(),
});

export default container;
