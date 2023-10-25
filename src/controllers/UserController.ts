import { PrismaClient } from '@prisma/client';
import Repository from '../interfaces/Repository';
import User from '../models/User';

export class UserController implements Repository<User> {
	private prisma: PrismaClient;

	constructor({ prisma }: { prisma: PrismaClient }) {
		this.prisma = prisma;
	}

	async getAll(): Promise<User[]> {
		return await this.prisma.user.findMany();
	}

	async getByID(id: number): Promise<User> {
		const user = await this.prisma.user.findFirstOrThrow({
			where: { id: id },
		});

		return user;
	}

	async create(user: User): Promise<User> {
		const createdUser = await this.prisma.user.create({ data: user });
		return createdUser;
	}

	async update(user: User): Promise<User> {
		// const u = await this.prisma .user.findUnique({where: {id: user.id}})

		const updatedUser = await this.prisma.user.update({
			where: {
				id: user.id,
			},
			data: user,
		});

		return updatedUser;
	}

	async delete(user: User): Promise<User> {
		const deletedUser = await this.prisma.user.delete({
			where: { id: user.id },
		});

		return deletedUser;
	}
}

export default UserController;
