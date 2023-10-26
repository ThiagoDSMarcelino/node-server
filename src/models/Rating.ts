import Hotel from './Hotel/Hotel';
import User from './User/User';

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
