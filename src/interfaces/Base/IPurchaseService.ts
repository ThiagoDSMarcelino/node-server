import { Purchase, User } from '@prisma/client';

interface IPurchaseService {
	create(obj: Purchase, user: User): Promise<Purchase>;
	list(): Promise<Purchase[]>;
	delete(id: number, user: User): Promise<Purchase>;
}

export default IPurchaseService;
