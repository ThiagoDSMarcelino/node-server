import { Decimal } from '@prisma/client/runtime/library';

interface Room {
	id: number;
	doubleBed: number;
	singleBed: number;
	adults: number;
	children: number;
	daily: Decimal;
	hotelId: number;
}

export default Room;
