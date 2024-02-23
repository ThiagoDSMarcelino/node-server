import { Hotel, PrismaClient } from '@prisma/client';

import IContainer from '../interfaces/IContainer';
import IHotelService from '../interfaces/IHotelService';

class HotelService implements IHotelService {
	private prisma: PrismaClient;

	public constructor({ prisma }: IContainer) {
		this.prisma = prisma;
	}

	public async create(data: Hotel): Promise<Hotel> {
		const created = this.prisma.hotel.create({ data });
		return created;
	}

	public async list(): Promise<Hotel[]> {
		const hotels = await this.prisma.hotel.findMany();
		return hotels;
	}
}

export default HotelService;
