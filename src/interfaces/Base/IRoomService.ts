import { Room, User } from '@prisma/client';

interface IRoomService {
	create(data: Room, user: User): Promise<Room>;
	list(): Promise<Room[]>;
	delete(id: number, loggedUser: User): Promise<Room>;
}

export default IRoomService;
