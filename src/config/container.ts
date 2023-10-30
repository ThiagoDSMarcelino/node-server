import { asClass, asFunction, createContainer } from 'awilix';

import HotelController from '../controllers/HotelController';
import RoomController from '../controllers/RoomController';
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
	hotelController: asClass(HotelController).scoped(),
	roomController: asClass(RoomController).scoped(),

	// Services
	securityService: asClass(SecurityService).scoped(),
});

export default container;
