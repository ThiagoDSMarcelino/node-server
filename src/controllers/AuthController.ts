import { PrismaClient } from '@prisma/client';

import AuthError from '../errors/AuthError';
import UserError from '../errors/UserError';
import IContainer from '../interfaces/IContainer';
import ISecurityService from '../interfaces/ISecurityService';
import UserLogin from '../models/User/UserLogin';
import DTOConverter from '../shared/DTOConverter';

class AuthController {
	private prisma: PrismaClient;
	private securityService: ISecurityService;

	public constructor({ prisma, securityService }: IContainer) {
		this.prisma = prisma;
		this.securityService = securityService;
	}

	public async login(data: UserLogin): Promise<string> {
		const user = await this.prisma.user
			.findFirstOrThrow({
				where: { email: data.email },
			})
			.catch(() => {
				throw UserError.notFound();
			});

		const passwordMatch = await this.securityService.comparePassword(
			user.password,
			data.password,
		);

		if (!passwordMatch) {
			throw AuthError.passwordMismatch();
		}

		const dto = DTOConverter.convertUser(user);
		const token = this.securityService.genJWT(dto);

		return token;
	}
}

export default AuthController;
