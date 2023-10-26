import { v4 as uuidv4 } from 'uuid';

import { PrismaClient } from '@prisma/client';

import container from '../container';
import ISecurityService from '../interfaces/ISecurityService';
import CreateUser from '../models/User/CreateUser';
import User from '../models/User/User';
import UserDTO from '../models/User/UserDTO';

export class UserController {
	private prisma: PrismaClient;

	constructor({ prisma }: { prisma: PrismaClient }) {
		this.prisma = prisma;
	}

	async create(user: CreateUser): Promise<String> {
		const security = container.resolve<ISecurityService>('securityService');

		const hashedPassword = await security.encryptPassword(user.password);

		const newUser: User = {
			id: uuidv4(),
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
			password: hashedPassword,
			CPF: user.CPF,
		};

		const res = await this.prisma.user.create({ data: newUser });

		const token = await security.genJWT(res);

		return token;
	}

	async getAll(): Promise<UserDTO[]> {
		throw new Error('Method not implemented.');
	}
}

export default UserController;
