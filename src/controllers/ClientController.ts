import { PrismaClient } from '@prisma/client';
import Repository from '../interfaces/Repository';
import Client from '../models/Client';

export class ClientController implements Repository<Client> {
	private prisma: PrismaClient;

	constructor({ prisma }: { prisma: PrismaClient }) {
		this.prisma = prisma;
	}

	async list(): Promise<Client[]> {
		return await this.prisma.user.findMany();
	}
}

export default ClientController;
