import Client from './Client';
import Hotel from './Hotel';

interface Rating {
	id: number;
	client: Client;
	clientId: number;
	hotel: Hotel;
	hotelId: number;
	content: string | undefined;
	rate: number;
}

export default Rating;
