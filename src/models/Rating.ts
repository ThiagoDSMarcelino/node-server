import User from './User/User';
import Hotel from './Hotel/Hotel';

interface Rating {
	id: number;
	user: User;
	userId: number;
	hotel: Hotel;
	hotelId: number;
	content: string | undefined;
	rate: number;
}

export default Rating;
