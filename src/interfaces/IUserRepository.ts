import CreateUser from '../models/User/CreateUser';
import UserDTO from '../models/User/UserDTO';

interface IUserRepository {
	create(user: CreateUser): Promise<String>;
	getAll(): Promise<UserDTO[]>;
	getById(id: string): Promise<UserDTO>;
	delete(id: string): Promise<UserDTO>;
}

export default IUserRepository;
