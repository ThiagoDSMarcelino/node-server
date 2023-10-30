import { Room } from '@prisma/client';
import SearchRoom from '../models/Room/SearchRoom';

interface IRoomController {
	getAll(): Promise<Room[]>;
	getById(id: number): Promise<Room>;
	getFiltered(filters: SearchRoom): Promise<Room[]>;
	getByHotel(hotelID: number): Promise<Room[]>;
	create(room: Room): Promise<Room>;
}

export default IRoomController;
