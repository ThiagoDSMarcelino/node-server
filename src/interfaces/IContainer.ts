import { PrismaClient } from '@prisma/client';

import IHotelController from './IHotelController';
import IRoomController from './IRoomController';
import ISecurityService from './ISecurityService';
import IUserRepository from './IUserRepository';

interface IContainer {
	prisma: PrismaClient;
	userController: IUserRepository;
	hotelController: IHotelController;
	roomController: IRoomController;
	securityService: ISecurityService;
}

export default IContainer;
