import CreateUser from '../models/User/CreateUser';
import UserDTO from '../models/User/UserDTO';

interface IUserController {
	create(user: CreateUser): Promise<string>;
	getAll(): Promise<UserDTO[]>;
	getById(id: string): Promise<UserDTO>;
	delete(id: string): Promise<UserDTO>;
}

export default IUserController;
