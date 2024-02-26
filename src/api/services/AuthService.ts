import { PrismaClient, User } from '@prisma/client';

import IAuthService from '../../interfaces/Base/IAuthService';
import ISecurityService from '../../interfaces/Base/ISecurityService';
import IContainer from '../../interfaces/IContainer';
import AuthError from '../errors/AuthError';
import EntityError from '../errors/EntityError';
import ServerError from '../errors/ServerError';

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
