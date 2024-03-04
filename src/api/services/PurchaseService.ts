import { PrismaClient, Purchase, Status, User } from '@prisma/client';

import IPurchaseService from '../../interfaces/Base/IPurchaseService';
import IContainer from '../../interfaces/IContainer';
import AuthError from '../errors/AuthError';
import EntityError from '../errors/EntityError';
import ServerError from '../errors/ServerError';

class PurchaseService implements IPurchaseService {
	private prisma: PrismaClient;

	public constructor({ prisma }: IContainer) {
		this.prisma = prisma;
	}

	public async create(data: Purchase, user: User): Promise<Purchase> {
		const purchase: Purchase = { ...data, userId: user.id };

		const created = await this.prisma.purchase.create({ data: purchase });
		return created;
	}

	public async list(): Promise<Purchase[]> {
		const purchases = await this.prisma.purchase.findMany();
		return purchases;
	}

	public async find(id: number): Promise<Purchase> {
		const purchase = await this.prisma.purchase
			.findFirstOrThrow({
				where: { id },
			})
			.catch(() => {
				throw new ServerError(EntityError.notFound());
			});

		return purchase;
	}

	public async delete(id: number, loggedUser: User): Promise<Purchase> {
		if (!loggedUser.isAdmin) {
			throw new ServerError(AuthError.adminOnly());
		}

		const deleted = await this.prisma.purchase
			.delete({
				where: { id: id },
			})
			.catch(() => {
				throw new ServerError(EntityError.notFound());
			});

		return deleted;
	}

	public async status(): Promise<Status[]> {
		const status = await this.prisma.status.findMany();
		return status;
	}
}

export default PurchaseService;
