import { PrismaClient } from '@prisma/client';
import IUserRepository from './IUserRepository';
import ISecurityService from './ISecurityService';
import IHotelController from './IHotelController';
import IRoomController from './IRoomController';

interface IContainer {
	prisma: PrismaClient;
	userController: IUserRepository;
	hotelController: IHotelController;
	roomController: IRoomController;
	securityService: ISecurityService;
}

export default IContainer;
