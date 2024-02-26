import { PrismaClient } from '@prisma/client';

import IAuthService from './Base/IAuthService';
import IHotelService from './Base/IHotelService';
import ISecurityService from './Base/ISecurityService';
import IUserService from './Base/IUserService';

interface IContainer {
	prisma: PrismaClient;
	userService: IUserService;
	authService: IAuthService;
	hotelService: IHotelService;
	securityService: ISecurityService;
}

export default IContainer;
