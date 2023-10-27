import { PrismaClient } from '@prisma/client';

import Room from '../models/Room/Room';
import SearchRoom from '../models/Room/SearchRoom';

export class RoomController {
	private prisma: PrismaClient;

	constructor({ prisma }: { prisma: PrismaClient }) {
		this.prisma = prisma;
	}

	async getAll(): Promise<Room[]> {
		return await this.prisma.room.findMany();
	}

	async getFiltered(filters: SearchRoom): Promise<Room[]> {
		return await this.prisma.room.findMany({
			where: {
				doubleBed: filters.doubleBed,
				singleBed: filters.singleBed,
				daily: {
					lte: filters.maxDaily,
					gte: filters.minDaily,
				},
			},
		});
	}

	async getByHotel(hotelID: number): Promise<Room[]> {
		const room = await this.prisma.room.findMany({
			where: { hotelId: hotelID },
		});
		return room;
	}
}

export default RoomController;
