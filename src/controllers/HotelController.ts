import { PrismaClient } from '@prisma/client';
import Repository from '../interfaces/Repository';
import Hotel from '../models/Hotel';

export class HotelController implements Repository<Hotel> {
	private prisma: PrismaClient;

	constructor({ prisma }: { prisma: PrismaClient }) {
		this.prisma = prisma;
	}

	async getAll(): Promise<Hotel[]> {
		return await this.prisma.hotel.findMany();
	}

	async getByID(id: number): Promise<Hotel> {
		const user = await this.prisma.hotel.findFirstOrThrow({
			where: { id: id },
		});

		return user;
	}

	async create(hotel: Hotel): Promise<Hotel> {
		const createdHotel = await this.prisma.hotel.create({ data: hotel });
		return createdHotel;
	}

	async update(hotel: Hotel): Promise<Hotel> {
		// const u = await this.prisma .user.findUnique({where: {id: user.id}})

		const updatedHotel = await this.prisma.hotel.update({
			where: {
				id: hotel.id,
			},
			data: hotel,
		});

		return updatedHotel;
	}

	async delete(hotel: Hotel): Promise<Hotel> {
		const deletedHotel = await this.prisma.hotel.delete({
			where: { id: hotel.id },
		});

		return deletedHotel;
	}
}

export default HotelController;
