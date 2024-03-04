import { Class, PrismaClient, Ticket, TransportType, User } from '@prisma/client';

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

	public async create(obj: Ticket, user: User): Promise<Ticket> {
		if (!user.isAdmin) {
			throw new ServerError(AuthError.adminOnly());
		}

		const data: Ticket = {
			...obj,
			departureDateTime: new Date(obj.departureDateTime),
			arrivalDateTime: new Date(obj.arrivalDateTime),
		};

		const created = await this.prisma.ticket.create({ data });
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

	public async classes(): Promise<Class[]> {
		const classes = await this.prisma.class.findMany();

		return classes;
	}

	public async types(): Promise<TransportType[]> {
		const types = await this.prisma.transportType.findMany();

		return types;
	}
}

export default TicketService;
