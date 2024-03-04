import { User } from '@prisma/client';

interface IUserService {
	create(obj: User): Promise<User>;
	find(id: string): Promise<User>;
	delete(id: string, user: User): Promise<User>;
}

export default IUserService;
