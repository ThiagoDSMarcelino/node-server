import CreateUser from '../models/User/CreateUser';
import UserDTO from '../models/User/UserDTO';
import UserLogin from '../models/User/UserLogin';

interface IUserRepository {
	create(user: CreateUser): Promise<string>;
	login(data: UserLogin): Promise<string>;
	getAll(): Promise<UserDTO[]>;
	getById(id: string): Promise<UserDTO>;
	delete(id: string): Promise<UserDTO>;
}

export default IUserRepository;
