import { PrismaClient } from '@prisma/client';

import IAuthController from './IAuthController';
import ISecurityService from './ISecurityService';
import IUserController from './IUserController';

interface IContainer {
	prisma: PrismaClient;
	userController: IUserController;
	authController: IAuthController;
	securityService: ISecurityService;
}

export default IContainer;
