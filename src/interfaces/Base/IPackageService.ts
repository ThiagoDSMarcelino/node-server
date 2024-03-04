import { Package, User } from '@prisma/client';

interface IPackageService {
	create(obj: Package, user: User): Promise<Package>;
	list(): Promise<Package[]>;
	delete(id: number, user: User): Promise<Package>;
}

export default IPackageService;
