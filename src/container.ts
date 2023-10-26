import { createContainer, asFunction, asClass } from 'awilix';
import UserController from './controllers/UserController';
import HotelController from './controllers/HotelController';
import RoomController from './controllers/RoomController';
import SecurityService from './services/SecurityService';
import db from './db';

const container = createContainer();

container.register({
	// Database
	prisma: asFunction(db).singleton(),

	// Controllers
	userController: asClass(UserController).scoped(),
	hotelController: asClass(HotelController).scoped(),
	roomController: asClass(RoomController).scoped(),

	// Services
	securityService: asClass(SecurityService).scoped(),
});

export default container;
