import { asClass, asFunction, createContainer } from 'awilix';

import AuthService from '../api/services/AuthService';
import CreditCardService from '../api/services/CreditCardService';
import HotelService from '../api/services/HotelService';
import RoomService from '../api/services/RoomService';
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
	roomService: asClass(RoomService).scoped(),
	creditCardService: asClass(CreditCardService).scoped(),
	securityService: asClass(SecurityService).scoped(),
	ticketService: asClass(TicketService).scoped(),
});

export default container;
