import { v4 as uuidv4 } from 'uuid';

import { PrismaClient, User } from '@prisma/client';

import ControllerError from '../errors/ControllerError';
import IContainer from '../interfaces/IContainer';
import ISecurityService from '../interfaces/ISecurityService';
import CreateUser from '../models/User/CreateUser';
import UserDTO from '../models/User/UserDTO';

class UserController {
	private prisma: PrismaClient;
	private securityService: ISecurityService;

	public constructor({ prisma, securityService }: IContainer) {
		this.prisma = prisma;
		this.securityService = securityService;
	}

	public async create(data: CreateUser): Promise<String> {
		const isUniqueEmail = await this.prisma.user
			.findFirst({
				where: { email: data.email },
			})
			.then((u) => u !== null);

		if (isUniqueEmail) {
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
			birthday: data.birthday,
			lastName: data.lastName,
			password: hashedPassword,
			cpf: data.CPF,
		};

		const user = await this.prisma.user
			.create({ data: newUser })
			.then((user) => this.convertUser(user));

		const token = await this.securityService.genJWT(user);

		return token;
	}

	public async getAll(): Promise<UserDTO[]> {
		const users = await this.prisma.user
			.findMany()
			.then((users) => users.map((user) => this.convertUser(user)));

		return users;
	}

	public async getById(id: string): Promise<UserDTO> {
		const user = await this.prisma.user
			.findFirstOrThrow({
				where: { id: id },
			})
			.then((user) => this.convertUser(user));

		return user;
	}

	public async delete(id: string): Promise<UserDTO> {
		const user = await this.prisma.user
			.delete({
				where: { id: id },
			})
			.then((user) => this.convertUser(user));

		return user;
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
