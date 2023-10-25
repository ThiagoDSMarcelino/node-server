import Hotel from './Hotel';

interface Room {
	id: number;
	doubleBed: number;
	singleBed: number;
	adults: number;
	children: number;
	daily: number;
	hotel: Hotel;
	hotelId: number;
}

export default Room;
