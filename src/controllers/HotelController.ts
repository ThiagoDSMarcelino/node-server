import { PrismaClient } from '@prisma/client';

import Hotel from '../models/Hotel/Hotel';
import HotelDTO from '../models/Hotel/UpdateHotel';

class HotelController {
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

	async update(hotel: HotelDTO): Promise<Hotel> {
		const h: Hotel = await this.prisma.hotel.findFirstOrThrow({
			where: { id: hotel.id },
		});

		h.name = hotel.name?? h.name;
		h.city = hotel.city ?? h.city;
		h.neighborhood = hotel.neighborhood ?? h.neighborhood;
		h.complement = hotel.complement ?? h.complement;
		h.CEP = hotel.CEP ?? h.CEP;
		h.country = hotel.country ?? h.country;
		h.state = hotel.state ?? h.state;
		h.phone = hotel.phone ?? h.phone;
		h.email = hotel.email ?? h.email;

		const updatedHotel = await this.prisma.hotel.update({
			where: {
				id: h.id,
			},
			data: h,
		});

		return updatedHotel;
	}

	async delete(id: number): Promise<Hotel> {
		const deletedHotel = await this.prisma.hotel.delete({
			where: { id: id },
		});

		return deletedHotel;
	}
}

export default HotelController;
