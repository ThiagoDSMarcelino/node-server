import { Hotel } from '@prisma/client';

import HotelDTO from '../models/Hotel/HotelDTO';
import UpdateHotel from '../models/Hotel/UpdateHotel';

interface IHotelController {
	getAll(): Promise<HotelDTO[]>;
	getByID(id: number): Promise<Hotel>;
	create(hotel: Hotel): Promise<Hotel>;
	update(hotel: UpdateHotel): Promise<Hotel>;
	delete(id: number): Promise<Hotel>;
}

export default IHotelController;
