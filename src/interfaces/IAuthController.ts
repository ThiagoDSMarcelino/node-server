import Login from '../models/Auth/Login';

interface IAuthController {
	login(user: Login): Promise<string>;
}

export default IAuthController;
