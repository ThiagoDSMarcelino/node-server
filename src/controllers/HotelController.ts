import { Hotel, PrismaClient } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

import HotelDTO from '../models/Hotel/HotelDTO';
import UpdateHotel from '../models/Hotel/UpdateHotel';

class HotelController {
	private prisma: PrismaClient;

	constructor({ prisma }: { prisma: PrismaClient }) {
		this.prisma = prisma;
	}

	async getAll(): Promise<HotelDTO[]> {
		const hotels = await this.prisma.hotel.findMany({
			include: {
				rooms: true,
			},
		});

		const DTOs = hotels.map((hotel) => {
			let min = Number.MAX_VALUE;

			hotel.rooms.forEach((room) => {
				const value = room.daily.toNumber();
				if (min > value) min = value;
			});

			const dto: HotelDTO = {
				name: hotel.name,
				bestPrice: min,
			};

			return dto;
		});

		return DTOs;
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

	async update(data: UpdateHotel): Promise<Hotel> {
		const hotel: Hotel = await this.prisma.hotel.findFirstOrThrow({
			where: { id: data.id },
		});

		hotel.name = data.name ?? hotel.name;
		hotel.city = data.city ?? hotel.city;
		hotel.neighborhood = data.neighborhood ?? hotel.neighborhood;
		hotel.complement = data.complement ?? hotel.complement;
		hotel.cep = data.CEP ?? hotel.cep;
		hotel.country = data.country ?? hotel.country;
		hotel.state = data.state ?? hotel.state;
		hotel.phone = data.phone ?? hotel.phone;
		hotel.email = data.email ?? hotel.email;

		const updatedHotel = await this.prisma.hotel.update({
			where: {
				id: hotel.id,
			},
			data: hotel,
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
