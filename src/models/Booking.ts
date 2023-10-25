import Client from './Client';
import Room from './Room';

interface Booking {
	id: number;
	checkIn: Date;
	checkOut: Date;
	client: Client;
	clientId: number;
	room: Room;
	roomId: number;
}

export default Booking;
