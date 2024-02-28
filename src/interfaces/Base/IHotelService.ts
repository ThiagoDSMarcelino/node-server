import { Hotel, User } from '@prisma/client';

interface IHotelService {
	create(data: Hotel, user: User): Promise<Hotel>;
	list(): Promise<Hotel[]>;
	delete(id: number, loggedUser: User): Promise<Hotel>;
}

export default IHotelService;
