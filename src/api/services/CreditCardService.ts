import { CreditCard, PrismaClient, User } from '@prisma/client';

import ICreditCardService from '../../interfaces/Base/ICreditCardService';
import IContainer from '../../interfaces/IContainer';
import EntityError from '../errors/EntityError';
import ServerError from '../errors/ServerError';

class CreditCardService implements ICreditCardService {
	private prisma: PrismaClient;

	public constructor({ prisma }: IContainer) {
		this.prisma = prisma;
	}

	public async create(obj: CreditCard): Promise<CreditCard> {
		const created = await this.prisma.creditCard.create({ data: obj });
		return created;
	}

	public async list(): Promise<CreditCard[]> {
		const cards = await this.prisma.creditCard.findMany();
		return cards;
	}

	public async delete(id: number, user: User): Promise<CreditCard> {
		const card = await this.prisma.creditCard
			.findFirstOrThrow({
				where: { id: id },
			})
			.catch(() => {
				throw new ServerError(EntityError.notFound());
			});

		if (card.userId !== user.id) {
			throw new ServerError(EntityError.forbidden());
		}

		const deleted = await this.prisma.creditCard
			.delete({
				where: { id: id },
			})
			.catch(() => {
				throw new ServerError(EntityError.notFound());
			});

		return deleted;
	}
}

export default CreditCardService;
