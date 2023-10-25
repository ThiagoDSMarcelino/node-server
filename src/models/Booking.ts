import User from './User';
import Room from './Room';

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
