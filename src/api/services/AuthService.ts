import { PrismaClient, User } from '@prisma/client';

import AuthError from '../../config/errors/AuthError';
import ServerError from '../../config/errors/ServerError';
import EntityError from '../../config/errors/UserError';
import IAuthService from '../../interfaces/Base/IAuthService';
import ISecurityService from '../../interfaces/Base/ISecurityService';
import IContainer from '../../interfaces/IContainer';

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
