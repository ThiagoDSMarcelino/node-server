import { Router } from 'express';

import container from '../config/container';
import IAuthService from '../interfaces/IAuthService';
import Login from '../models/Auth/Login';

const AuthRoute = Router();
const controller = container.resolve<IAuthService>('authService');

// Login
AuthRoute.post('/', async (req, res, next) => {
	const data: Login = req.body;

	try {
		const token = await controller.login(data);

		return res.status(200).json(token);
	} catch (error) {
		next(error);
	}
});

export default AuthRoute;
