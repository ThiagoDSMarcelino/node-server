import { v4 as uuidv4 } from 'uuid';

import { PrismaClient, User } from '@prisma/client';

import container from '../config/container';
import ControllerError from '../errors/ControllerError';
import ISecurityService from '../interfaces/ISecurityService';
import CreateUser from '../models/User/CreateUser';
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
			image: '', // TODO: Create profile picture logic
			lastName: data.lastName,
			password: hashedPassword,
			CPF: data.CPF,
		};

		const user = await this.prisma.user.create({ data: newUser });
		const DTO = this.convertUser(user);

		const token = await this.securityService.genJWT(DTO);

		return token;
	}

	public async getAll(): Promise<UserDTO[]> {
		const users = await this.prisma.user.findMany();

		const DTOs = users.map((user) => this.convertUser(user));

		return DTOs;
	}

	public async getById(id: string): Promise<UserDTO> {
		const user = await this.prisma.user.findFirstOrThrow({
			where: { id: id },
		});

		const DTO = this.convertUser(user);

		return DTO;
	}

	public async delete(id: string): Promise<UserDTO> {
		const user = await this.prisma.user.delete({
			where: { id: id },
		});

		const DTO = this.convertUser(user);

		return DTO;
	}

	private convertUser(user: User): UserDTO {
		const DTO: UserDTO = {
			id: user.id,
			name: `${user.firstName} ${user.lastName}`,
		};

		return DTO;
	}
}

export default UserController;
