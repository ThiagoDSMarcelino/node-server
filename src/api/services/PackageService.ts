import { Package, PrismaClient, User } from '@prisma/client';

import IPackageService from '../../interfaces/Base/IPackageService';
import IContainer from '../../interfaces/IContainer';
import AuthError from '../errors/AuthError';
import EntityError from '../errors/EntityError';
import ServerError from '../errors/ServerError';

class PackageService implements IPackageService {
	private prisma: PrismaClient;

	public constructor({ prisma }: IContainer) {
		this.prisma = prisma;
	}

	public async create(data: Package, user: User): Promise<Package> {
		if (!user.isAdmin) {
			throw new ServerError(AuthError.adminOnly());
		}

		const created = await this.prisma.package.create({ data });
		return created;
	}

	public async list(): Promise<Package[]> {
		const packages = await this.prisma.package.findMany();

		return packages;
	}

	public async delete(id: number, user: User): Promise<Package> {
		if (!user.isAdmin) {
			throw new ServerError(EntityError.forbidden());
		}

		const deleted = await this.prisma.package
			.delete({
				where: { id: id },
			})
			.catch(() => {
				throw new ServerError(EntityError.notFound());
			});

		return deleted;
	}
}

export default PackageService;
