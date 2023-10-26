import CreateUser from '../models/User/CreateUser';
import UserDTO from '../models/User/UserDTO';

interface IUserRepository {
	getAll(): Promise<UserDTO>[];
	create(user: CreateUser): Promise<String>;
}

export default IUserRepository;
