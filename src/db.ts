import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient | null = null;

const db = (): PrismaClient => {
	if (!prisma) {
		prisma = new PrismaClient();
	}

	return prisma;
};

export default db;
