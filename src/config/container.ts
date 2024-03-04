import { asClass, asFunction, createContainer } from 'awilix';

import AuthService from '../api/services/AuthService';
import CreditCardService from '../api/services/CreditCardService';
import HotelService from '../api/services/HotelService';
import PackageService from '../api/services/PackageService';
import PurchaseService from '../api/services/PurchaseService';
import RoomService from '../api/services/RoomService';
import SecurityService from '../api/services/SecurityService';
import TicketService from '../api/services/TicketService';
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
	purchaseService: asClass(PurchaseService).scoped(),
	packageService: asClass(PackageService).scoped(),
});

export default container;
