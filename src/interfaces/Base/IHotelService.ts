import { Hotel, User } from '@prisma/client';

interface IHotelService {
	create(obj: Hotel, user: User): Promise<Hotel>;
	list(): Promise<Hotel[]>;
	delete(id: number, user: User): Promise<Hotel>;
}

export default IHotelService;
