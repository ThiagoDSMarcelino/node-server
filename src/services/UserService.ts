import { v4 as uuidv4 } from 'uuid';

import { PrismaClient, User } from '@prisma/client';

import RouteError from '../errors/RouteError';
import ServerError from '../errors/ServerError';
import UserError from '../errors/UserError';
import IContainer from '../interfaces/IContainer';
import ISecurityService from '../interfaces/ISecurityService';
import IUserService from '../interfaces/IUserService';
import CreateUser from '../models/User/CreateUser';
import UserDTO from '../models/User/UserDTO';
import { user2DTO } from '../shared/converters';

class UserService implements IUserService {
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
			throw new ServerError(UserError.emailAlreadyExists());
		}

		const hashedPassword = await this.securityService.encryptPassword(
			data.password,
		);

		const newUser: User = {
			id: uuidv4(),
			email: data.email,
			first_name: data.firstName,
			last_name: data.lastName,
			profile_picture: data.profilePicture,
			password: hashedPassword,
			cpf: data.cpf,
			birthday: new Date(data.birthday),
			is_admin: data.isAdmin ?? false,
			address_id: null,
		};

		const user = await this.prisma.user
			.create({ data: newUser })
			.then((user) => user2DTO(user));

		const token = await this.securityService.genJWT(user);

		return token;
	}

	public async find(id: string): Promise<UserDTO> {
		const user = await this.prisma.user
			.findFirstOrThrow({
				where: { id: id },
			})
			.catch(() => {
				throw new ServerError(UserError.notFound());
			})
			.then((user) => user2DTO(user));

		return user;
	}

	public async delete(id: string, loggedUser: User): Promise<UserDTO> {
		if (id !== loggedUser.id) {
			throw new ServerError(RouteError.unauthorized());
		}

		const deleted = await this.prisma.user
			.delete({
				where: { id: id },
			})
			.catch(() => {
				throw new ServerError(UserError.notFound());
			})
			.then((user) => user2DTO(user));

		return deleted;
	}
}

export default UserService;