import { asClass, asFunction, createContainer } from 'awilix';

import AuthController from '../controllers/AuthController';
import UserController from '../controllers/UserController';
import IContainer from '../interfaces/IContainer';
import SecurityService from '../services/SecurityService';
import db from './db';

const container = createContainer<IContainer>();

container.register({
	// Database
	prisma: asFunction(db).singleton(),

	// Controllers
	userController: asClass(UserController).scoped(),
	authController: asClass(AuthController).scoped(),

	// Services
	securityService: asClass(SecurityService).scoped(),
});

export default container;
