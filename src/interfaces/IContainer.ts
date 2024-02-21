import { PrismaClient } from '@prisma/client';

import IAuthRepository from './IAuthRepository';
import ISecurityService from './ISecurityService';
import IUserRepository from './IUserRepository';

interface IContainer {
	prisma: PrismaClient;
	userController: IUserRepository;
	authController: IAuthRepository;
	securityService: ISecurityService;
}

export default IContainer;
