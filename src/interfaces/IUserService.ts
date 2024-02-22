import { User } from '@prisma/client';

import CreateUser from '../models/User/CreateUser';
import UserDTO from '../models/User/UserDTO';

interface IUserService {
	create(user: CreateUser): Promise<string>;
	find(id: string): Promise<UserDTO>;
	delete(id: string, loggedUser: User): Promise<UserDTO>;
}

export default IUserService;
