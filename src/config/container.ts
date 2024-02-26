import { asClass, asFunction, createContainer } from 'awilix';

import AuthService from '../api/services/AuthService';
import HotelService from '../api/services/HotelService';
import SecurityService from '../api/services/SecurityService';
import UserService from '../api/services/UserService';
import IContainer from '../interfaces/IContainer';
import db from './db';

const container = createContainer<IContainer>();

container.register({
	// Database
	prisma: asFunction(db).singleton(),

	// Controllers
	hotelService: asClass(HotelService).scoped(),
	userService: asClass(UserService).scoped(),
	authService: asClass(AuthService).scoped(),
	securityService: asClass(SecurityService).scoped(),
});

export default container;
