import { PrismaClient } from '@prisma/client';
import Repository from '../interfaces/Repository';
import Client from '../models/Client';

export class ClientService implements Repository<Client> {
	private prisma: PrismaClient;

	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	async list(): Promise<Client[]> {
		return this.prisma.client.findMany();
	}
}

export default ClientService;
