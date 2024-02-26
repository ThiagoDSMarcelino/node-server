import { Hotel } from '@prisma/client';

interface IHotelService {
	create(data: Hotel): Promise<Hotel>;
	list(): Promise<Hotel[]>;
}

export default IHotelService;
