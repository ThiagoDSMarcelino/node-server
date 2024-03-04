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

	public async create(obj: CreditCard, user: User): Promise<CreditCard> {
		const data = {
			...obj,
			userId: user.id,
			expiration: new Date(obj.expiration),
		};
		
		const created = await this.prisma.creditCard.create({ data });
		return created;
	}

	public async list(user: User): Promise<CreditCard[]> {
		const cards = await this.prisma.creditCard.findMany({
			where: { userId: user.id },
		});

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
