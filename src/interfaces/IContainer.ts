import { PrismaClient } from '@prisma/client';

import IAuthService from './Base/IAuthService';
import ICreditCardService from './Base/ICreditCardService';
import IHotelService from './Base/IHotelService';
import IRoomService from './Base/IRoomService';
import ISecurityService from './Base/ISecurityService';
import IUserService from './Base/IUserService';

interface IContainer {
	prisma: PrismaClient;
	userService: IUserService;
	authService: IAuthService;
	hotelService: IHotelService;
	roomService: IRoomService;
	creditCardService: ICreditCardService;
	securityService: ISecurityService;
}

export default IContainer;
