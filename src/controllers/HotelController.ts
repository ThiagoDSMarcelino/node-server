import { PrismaClient } from '@prisma/client';
import HotelDTO from '../DTO/HotelDTO';
import Repository from '../interfaces/Repository';
import Hotel from '../models/Hotel';

export class HotelController implements Repository<Hotel> {
	private prisma: PrismaClient;

	constructor({ prisma }: { prisma: PrismaClient }) {
		this.prisma = prisma;
	}
	update(id: number): Promise<Hotel> {
		throw new Error('Method not implemented.');
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

	// async update(hotel: HotelDTO): Promise<Hotel> {
	// 	const h = await this.prisma.hotel.findFirstOrThrow({
	// 		where: { id: hotel.id },
	// 	});

		// h.name = hotel.name;
		// h.city = hotel.city;
		// h.neighborhood = hotel.neighborhood;
		// h.complement = hotel.complement;
		// h.CEP = hotel.CEP;
		// h.country = hotel.country;
		// h.state = hotel.state;
		// h.phone = hotel.phone;
		// h.email = hotel.email;

		// const updatedHotel = await this.prisma.hotel.update({
		// 	where: {
		// 		id: hotel.id,
		// 	},
		// 	data: { h },
		// });

	// 	return h;
	// }

	async delete(id: number): Promise<Hotel> {
		const deletedHotel = await this.prisma.hotel.delete({
			where: { id: id },
		});

		return deletedHotel;
	}
}

export default HotelController;
