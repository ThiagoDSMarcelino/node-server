import { Hotel, PrismaClient, User } from '@prisma/client';

import IHotelService from '../../interfaces/Base/IHotelService';
import IContainer from '../../interfaces/IContainer';
import AuthError from '../errors/AuthError';
import EntityError from '../errors/EntityError';
import ServerError from '../errors/ServerError';

class HotelService implements IHotelService {
	private prisma: PrismaClient;

	public constructor({ prisma }: IContainer) {
		this.prisma = prisma;
	}

	public async create(data: Hotel, user: User): Promise<Hotel> {
		if (!user.isAdmin) {
			throw new ServerError(AuthError.adminOnly());
		}

		const isInvalidData = await this.prisma.hotel
			.findFirst({
				where: {
					OR: [
						{ name: data.name },
						{ email: data.email },
						{ cnpj: data.cnpj },
						{ phone: data.phone },
					],
				},
			})
			.then((hotel) => hotel !== null);

		if (isInvalidData) {
			throw new ServerError(
				EntityError.propertyAlreadyExists(
					'name or email or cnpj or phone',
				),
			);
		}

		const created = await this.prisma.hotel.create({ data });
		return created;
	}

	public async list(): Promise<Hotel[]> {
		const hotels = await this.prisma.hotel.findMany();
		return hotels;
	}
}

export default HotelService;
