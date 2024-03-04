import { Ticket, User } from '@prisma/client';

interface ITicketService {, user: User): Promise<Ticket>;
	list(): Promise<Ticket[]>;
	delete(id: number, user: User): Promise<Ticket>;
}

export default ITicketService;
