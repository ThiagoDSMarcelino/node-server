import Login from '../models/Auth/Login';

interface IAuthService {
	login(user: Login): Promise<string>;
}

export default IAuthService;
