import { v4 as uuidv4 } from 'uuid';

import { PrismaClient, User } from '@prisma/client';

import ControllerError from '../errors/ControllerError';
import IContainer from '../interfaces/IContainer';
import ISecurityService from '../interfaces/ISecurityService';
import CreateUser from '../models/User/CreateUser';
import UserDTO from '../models/User/UserDTO';
import UserLogin from '../models/User/UserLogin';

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
			throw ControllerError.invalidArgument('E-mail must be unique');
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
			.then((user) => this.convertUser(user));

		const token = await this.securityService.genJWT(user);

		return token;
	}

	public async login(data: UserLogin): Promise<string> {
		const user = await this.prisma.user.findFirstOrThrow({
			where: { email: data.email },
		});

		const passwordMatch = await this.securityService.comparePassword(
			user.password,
			data.password,
		);

		if (!passwordMatch) {
			throw new Error('Wrong password'); // TODO: Create custom error
		}

		const dto = this.convertUser(user);
		const token = this.securityService.genJWT(dto);

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
			email: user.email,
			profile_picture: user.profile_picture,
			first_name: user.first_name,
			last_name: user.last_name,
			birthday: user.birthday,
			is_admin: user.is_admin,
		};

		return DTO;
	}
}

export default UserController;
