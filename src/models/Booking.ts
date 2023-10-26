import User from './User/User';
import Room from './Room/Room';

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
