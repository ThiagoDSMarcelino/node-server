import { v4 as uuidv4 } from 'uuid';

import { PrismaClient, User } from '@prisma/client';

import UserError from '../errors/UserError';
import IContainer from '../interfaces/IContainer';
import ISecurityService from '../interfaces/ISecurityService';
import CreateUser from '../models/User/CreateUser';
import UserDTO from '../models/User/UserDTO';
import DTOConverter from '../shared/DTOConverter';

class UserController {
	private prisma: PrismaClient;
	private securityService: ISecurityService;

	public constructor({ prisma, securityService }: IContainer) {
		this.prisma = prisma;
		this.securityService = securityService;
	}

	public async create(data: CreateUser): Promise<string> {
		const emailAlreadyUsed = await this.prisma.user
			.findFirst({
				where: { email: data.email },
			})
			.then((u) => u !== null);

		if (emailAlreadyUsed) {
			throw UserError.emailAlreadyExists();
		}

		const hashedPassword = await this.securityService.encryptPassword(
			data.password,
		);

		const newUser: User = {
			id: uuidv4(),
			email: data.email,
			first_name: data.first_name,
			last_name: data.last_name,
			profile_picture: data.profile_picture,
			password: hashedPassword,
			cpf: data.cpf,
			birthday: data.birthday,
			is_admin: data.is_admin ?? false,
			address_id: null,
		};

		const user = await this.prisma.user
			.create({ data: newUser })
			.then((user) => DTOConverter.convertUser(user));

		const token = await this.securityService.genJWT(user);

		return token;
	}

	public async getAll(): Promise<UserDTO[]> {
		const users = await this.prisma.user
			.findMany()
			.then((users) =>
				users.map((user) => DTOConverter.convertUser(user)),
			);

		return users;
	}

	public async getById(id: string): Promise<UserDTO> {
		const user = await this.prisma.user
			.findFirstOrThrow({
				where: { id: id },
			})
			.catch(() => {
				throw UserError.notFound();
			})
			.then((user) => DTOConverter.convertUser(user));

		return user;
	}

	public async delete(id: string): Promise<UserDTO> {
		const user = await this.prisma.user.delete({
			where: { id: id },
		});

		if (!user) {
			throw UserError.notFound();
		}

		const dto = DTOConverter.convertUser(user);

		return dto;
	}
}

export default UserController;
