import { PrismaClient, User } from '@prisma/client';

import AuthError from '../errors/AuthError';
import ServerError from '../errors/ServerError';
import EntityError from '../errors/UserError';
import IAuthService from '../interfaces/IAuthService';
import IContainer from '../interfaces/IContainer';
import ISecurityService from '../interfaces/ISecurityService';

class AuthService implements IAuthService {
	private prisma: PrismaClient;
	private securityService: ISecurityService;

	public constructor({ prisma, securityService }: IContainer) {
		this.prisma = prisma;
		this.securityService = securityService;
	}

	public async login(email: string, password: string): Promise<User> {
		const user = await this.prisma.user
			.findFirstOrThrow({
				where: { email },
			})
			.catch(() => {
				throw new ServerError(EntityError.notFound());
			});

		const passwordMatch = await this.securityService.comparePassword(
			user.password,
			password,
		);

		if (!passwordMatch) {
			throw new ServerError(AuthError.passwordMismatch());
		}

		return user;
	}
}

export default AuthService;
