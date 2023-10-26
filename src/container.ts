import { createContainer, asFunction, asClass } from 'awilix';
import UserController from './controllers/UserController';
import SecurityService from './services/SecurityService';
import db from './db';

const container = createContainer();

container.register({
	 // Database
	prisma: asFunction(db).singleton(),

	// Controllers
	userController: asClass(UserController).scoped(),

	// Services
	securityService: asClass(SecurityService).scoped(),
});

export default container;
