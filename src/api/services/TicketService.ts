import { PrismaClient, Ticket, User } from '@prisma/client';

import ITicketService from '../../interfaces/Base/ITicketService';
import IContainer from '../../interfaces/IContainer';
import AuthError from '../errors/AuthError';
import EntityError from '../errors/EntityError';
import ServerError from '../errors/ServerError';

class TicketService implements ITicketService {
	private prisma: PrismaClient;

	public constructor({ prisma }: IContainer) {
		this.prisma = prisma;
	}

	public async create(data: Ticket, user: User): Promise<Ticket> {
		if (!user.isAdmin) {
			throw new ServerError(AuthError.adminOnly());
		}

		const created = await this.prisma.ticket.create({ data: data });
		return created;
	}

	public async list(): Promise<Ticket[]> {
		const tickets = await this.prisma.ticket.findMany();

		return tickets;
	}

	public async delete(id: number, user: User): Promise<Ticket> {
		if (!user.isAdmin) {
			throw new ServerError(EntityError.forbidden());
		}

		const deleted = await this.prisma.ticket
			.delete({
				where: { id: id },
			})
			.catch(() => {
				throw new ServerError(EntityError.notFound());
			});

		return deleted;
	}
}

export default TicketService;
