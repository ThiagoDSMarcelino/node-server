import { asClass, asFunction, createContainer } from 'awilix';

import IContainer from '../interfaces/IContainer';
import AuthService from '../services/AuthService';
import SecurityService from '../services/SecurityService';
import UserService from '../services/UserService';
import db from './db';

const container = createContainer<IContainer>();

container.register({
	// Database
	prisma: asFunction(db).singleton(),

	// Controllers
	userService: asClass(UserService).scoped(),
	authService: asClass(AuthService).scoped(),

	// Services
	securityService: asClass(SecurityService).scoped(),
});

export default container;
