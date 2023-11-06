import { Decimal } from '@prisma/client/runtime/library';

type SearchRoom = {
	doubleBed: number;
	singleBed: number;
	maxDaily: Decimal;
	minDaily: Decimal;
}

export default SearchRoom;
