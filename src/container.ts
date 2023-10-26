import { createContainer, asFunction, asValue, asClass } from 'awilix';
import UserController from './controllers/UserController';
import SecurityService from './services/SecurityService';
import db from './db';

const container = createContainer();

container.register({
	prisma: asFunction(db).singleton(), // Database

	// Controllers
	userController: asClass(UserController).scoped(),

	// Services
	securityService: asClass(SecurityService).scoped(),
});

export default container;
