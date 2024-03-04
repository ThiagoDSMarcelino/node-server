import { Purchase, PrismaClient, User } from '@prisma/client';
import IPurchaseService from '../../interfaces/Base/IPurchaseService';
import IContainer from '../../interfaces/IContainer';
import ServerError from '../errors/ServerError';
import EntityError from '../errors/EntityError';
import AuthError from '../errors/AuthError';

class PurchaseService implements IPurchaseService{
    private prisma: PrismaClient;

    public constructor({ prisma }: IContainer) {
		this.prisma = prisma;
	}

    public async create(data: Purchase, user: User): Promise<Purchase> {
const purshe:Purchase = {...data, userId: user.id}

		const created = await this.prisma.purchase.create({ data: purshe });
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
}

export default PurchaseService;

