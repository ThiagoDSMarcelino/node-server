import { User } from '@prisma/client';

import CreateUser from '../../api/models/User/CreateUser';
import UserDTO from '../../api/models/UserDTO';

interface IUserService {
	create(user: CreateUser): Promise<UserDTO>;
	find(id: string): Promise<UserDTO>;
	delete(id: string, loggedUser: User): Promise<UserDTO>;
}

export default IUserService;
