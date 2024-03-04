import { Class, Ticket, TransportType, User } from '@prisma/client';

interface ITicketService {
	create(obj: Ticket, user: User): Promise<Ticket>;
	list(): Promise<Ticket[]>;
	delete(id: number, user: User): Promise<Ticket>;
	classes(): Promise<Class[]>;
	types(): Promise<TransportType[]>;
}

export default ITicketService;
