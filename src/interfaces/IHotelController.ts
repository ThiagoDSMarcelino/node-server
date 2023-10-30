import { Hotel } from '@prisma/client';
import UpdateHotel from '../models/Hotel/UpdateHotel';

interface IHotelController {
	getAll(): Promise<Hotel[]>;
	getByID(id: number): Promise<Hotel>;
	create(hotel: Hotel): Promise<Hotel>;
	update(hotel: UpdateHotel): Promise<Hotel>;
	delete(id: number): Promise<Hotel>;
}

export default IHotelController;
