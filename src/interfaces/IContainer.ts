import { PrismaClient } from '@prisma/client';

import IAuthService from './Base/IAuthService';
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
	securityService: ISecurityService;
}

export default IContainer;
