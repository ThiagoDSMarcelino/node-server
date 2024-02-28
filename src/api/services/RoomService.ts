import { PrismaClient, Room, User } from '@prisma/client';

import IRoomService from '../../interfaces/Base/IRoomService';
import IContainer from '../../interfaces/IContainer';
import AuthError from '../errors/AuthError';
import EntityError from '../errors/EntityError';
import ServerError from '../errors/ServerError';

class RoomService implements IRoomService {
	private prisma: PrismaClient;

	public constructor({ prisma }: IContainer) {
		this.prisma = prisma;
	}

	public async create(data: Room, user: User): Promise<Room> {
		if (!user.isAdmin) {
			throw new ServerError(AuthError.adminOnly());
        }
        
		const isInvalidData = await this.prisma.room
			.findFirst({
				where: { name: data.name },
			})
			.then((room) => room !== null);

		if (isInvalidData) {
			throw new ServerError(EntityError.propertyAlreadyExists('name'));
		}

		const created = await this.prisma.room.create({ data });
		return created;
	}

	public async list(): Promise<Room[]> {
		const hotels = await this.prisma.room.findMany();
		return hotels;
	}

	public async delete(id: number, loggedUser: User): Promise<Room> {
		if (!loggedUser.isAdmin) {
			throw new ServerError(AuthError.adminOnly());
		}

		const deleted = await this.prisma.room
			.delete({
				where: { id: id },
			})
			.catch(() => {
				throw new ServerError(EntityError.notFound());
			});

		return deleted;
	}
}

export default RoomService;
