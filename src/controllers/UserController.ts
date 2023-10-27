import { v4 as uuidv4 } from 'uuid';

import { PrismaClient } from '@prisma/client';

import container from '../container';
import ControllerError from '../errors/ControllerError';
import ISecurityService from '../interfaces/ISecurityService';
import CreateUser from '../models/User/CreateUser';
import User from '../models/User/User';
import UserDTO from '../models/User/UserDTO';

class UserController {
	private prisma: PrismaClient;
	private securityService: ISecurityService;

	public constructor({ prisma }: { prisma: PrismaClient }) {
		this.prisma = prisma;
		this.securityService =
			container.resolve<ISecurityService>('securityService');
	}

	public async create(data: CreateUser): Promise<String> {
		const uniqueEmail = this.prisma.user.findUnique({
			where: { email: data.email },
		});

		if (uniqueEmail !== null) {
			throw ControllerError.invalidArgument('E-mail must be unique');
		}

		const hashedPassword = await this.securityService.encryptPassword(
			data.password,
		);

		const newUser: User = {
			id: uuidv4(),
			email: data.email,
			firstName: data.firstName,
			lastName: data.lastName,
			password: hashedPassword,
			CPF: data.CPF,
		};

		const user = await this.prisma.user.create({ data: newUser });
		const dto = this.convertUser(user);

		const res = await this.securityService.genJWT(dto);

		return res;
	}

	public async getAll(): Promise<UserDTO[]> {
		const users = await this.prisma.user.findMany();

		const res = users.map((user) => this.convertUser(user));

		return res;
	}

	public async getById(id: string): Promise<UserDTO> {
		const user = await this.prisma.user.findFirstOrThrow({
			where: { id: id },
		});

		return this.convertUser(user);
	}

	public async delete(id: string): Promise<UserDTO> {
		const user = await this.prisma.user.delete({
			where: { id: id },
		});

		return this.convertUser(user);
	}

	private convertUser(user: User): UserDTO {
		const dto: UserDTO = {
			id: user.id,
			name: `${user.firstName} ${user.lastName}`,
		};

		return dto;
	}
}

export default UserController;
