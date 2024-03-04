import { CreditCard, User } from '@prisma/client';

interface ICreditCardService {
	create(obj: CreditCard, user: User): Promise<CreditCard>;
	list(user: User): Promise<CreditCard[]>;
	delete(id: number, user: User): Promise<CreditCard>;
}

export default ICreditCardService;
