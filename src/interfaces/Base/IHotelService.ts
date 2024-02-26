import { Hotel, User } from '@prisma/client';

import CreateHotel from '../../api/models/Hotel/CreateHotel';

interface IHotelService {
	create(data: CreateHotel, user: User): Promise<Hotel>;
	list(): Promise<Hotel[]>;
}

export default IHotelService;
