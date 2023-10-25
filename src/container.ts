import { createContainer, asFunction, asValue, asClass } from 'awilix';
import ClientService from './services/ClientService';
import express from 'express';
import db from './db';

const container = createContainer();

container.register({
	app: asValue(express()),
	prisma: asFunction(db).singleton(),
	clientService: asClass(ClientService).scoped(),
});

export default container;
