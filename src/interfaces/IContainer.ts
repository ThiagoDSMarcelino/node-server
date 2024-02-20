import { PrismaClient } from '@prisma/client';

import ISecurityService from './ISecurityService';
import IUserRepository from './IUserRepository';

interface IContainer {
	prisma: PrismaClient;
	userController: IUserRepository;
	securityService: ISecurityService;
}

export default IContainer;
