import { createContainer, asFunction, asValue, asClass } from 'awilix';
import { PrismaClient } from '@prisma/client';
import express from 'express';
import ClientService from './services/ClientService';

const container = createContainer();
const app = express();

container.register({
	app: asValue(app),
	prisma: asFunction(() => new PrismaClient()),
	clientService: asClass(ClientService).singleton(),
});

export default container;
