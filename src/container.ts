import { createContainer, asFunction, asValue, asClass } from 'awilix';
import UserController from './controllers/UserController';
import express from 'express';
import db from './db';

const container = createContainer();

container.register({
	app: asValue(express()),
	prisma: asFunction(db).singleton(),
	userController: asClass(UserController).scoped(),
});

export default container;
