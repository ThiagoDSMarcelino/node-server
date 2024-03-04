import { Purchase, Status, User } from '@prisma/client';

interface IPurchaseService {
	create(obj: Purchase, user: User): Promise<Purchase>;
	list(): Promise<Purchase[]>;
	delete(id: number, user: User): Promise<Purchase>;
	status(): Promise<Status[]>;
}

export default IPurchaseService;
