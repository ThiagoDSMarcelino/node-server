import { PrismaClient } from '@prisma/client';

import IAuthService from './Base/IAuthService';
import ICreditCardService from './Base/ICreditCardService';
import IHotelService from './Base/IHotelService';
import IRoomService from './Base/IRoomService';
import ISecurityService from './Base/ISecurityService';
import ITicketService from './Base/ITicketService';
import IUserService from './Base/IUserService';

interface IContainer {
	prisma: PrismaClient;
	userService: IUserService;
	authService: IAuthService;
	hotelService: IHotelService;
	roomService: IRoomService;
	creditCardService: ICreditCardService;
	ticketService: ITicketService;
	securityService: ISecurityService;
}

export default IContainer;
