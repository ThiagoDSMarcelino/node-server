import { PrismaClient, Room } from '@prisma/client';

import SearchRoom from '../models/Room/SearchRoom';

export class RoomController {
	private prisma: PrismaClient;

	constructor({ prisma }: { prisma: PrismaClient }) {
		this.prisma = prisma;
	}

	async getAll(): Promise<Room[]> {
		return await this.prisma.room.findMany();
	}

	async getById(id: number): Promise<Room> {
		const room = await this.prisma.room.findUniqueOrThrow({
			where: { id: id },
		});

		return room;
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

	async create(room: Room): Promise<Room> {
		const newRoom = await this.prisma.room.create({ data: room });

		return newRoom;
	}
}

export default RoomController;
