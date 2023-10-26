import Room from './Room';
import User from './User/User';

interface Booking {
	id: number;
	checkIn: Date;
	checkOut: Date;
	user: User;
	userId: number;
	room: Room;
	roomId: number;
}

export default Booking;
