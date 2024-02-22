import CreateUser from '../models/User/CreateUser';
import UserDTO from '../models/User/UserDTO';

interface IUserService {
	create(user: CreateUser): Promise<string>;
	getById(id: string): Promise<UserDTO>;
	delete(id: string): Promise<UserDTO>;
}

export default IUserService;
