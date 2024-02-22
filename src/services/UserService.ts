import { v4 as uuidv4 } from 'uuid';

import { PrismaClient, User } from '@prisma/client';

import ServerError from '../errors/ServerError';
import UserError from '../errors/UserError';
import IContainer from '../interfaces/IContainer';
import ISecurityService from '../interfaces/ISecurityService';
import IUserService from '../interfaces/IUserService';
import CreateUser from '../models/User/CreateUser';
import UserDTO from '../models/User/UserDTO';
import DTOConverter from '../shared/DTOConverter';

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
		throw ServerError.notImplemented();
		// // const user = await this.prisma.user.delete({
		// // 	where: { id: id },
		// // });

		// // if (!user) {
		// // 	throw UserError.notFound();
		// // }

		// // const dto = DTOConverter.convertUser(user);

		// // return dto;
	}
}

export default UserService;
