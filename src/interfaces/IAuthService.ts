import { User } from '@prisma/client';

interface IAuthService {
	login(email: string, password: string): Promise<User>;
}

export default IAuthService;
