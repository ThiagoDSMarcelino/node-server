import { PrismaClient } from '@prisma/client';

import IAuthService from './IAuthService';
import ISecurityService from './ISecurityService';
import IUserService from './IUserService';

interface IContainer {
	prisma: PrismaClient;
	userService: IUserService;
	authService: IAuthService;
	securityService: ISecurityService;
}

export default IContainer;
