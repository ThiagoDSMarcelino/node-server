import { asClass, asFunction, createContainer } from 'awilix';

import HotelController from './controllers/HotelController';
import UserController from './controllers/UserController';
import db from './db';
import SecurityService from './services/SecurityService';

const container = createContainer();

container.register({
	// Database
	prisma: asFunction(db).singleton(),

	// Controllers
	userController: asClass(UserController).scoped(),
	hotelController: asClass(HotelController).scoped(),

	// Services
	securityService: asClass(SecurityService).scoped(),
});

export default container;
