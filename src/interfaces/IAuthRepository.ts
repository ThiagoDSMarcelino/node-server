import UserLogin from '../models/User/UserLogin';

interface IAuthRepository {
	login(user: UserLogin): Promise<string>;
}

export default IAuthRepository;
