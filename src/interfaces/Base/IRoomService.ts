import { Room, User } from '@prisma/client';

interface IRoomService {
	create(obj: Room, user: User): Promise<Room>;
	list(): Promise<Room[]>;
	delete(id: number, user: User): Promise<Room>;
}

export default IRoomService;
