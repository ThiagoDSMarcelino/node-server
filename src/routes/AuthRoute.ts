import { Router } from 'express';

import container from '../config/container';
import IAuthRepository from '../interfaces/IAuthRepository';
import UserLogin from '../models/User/UserLogin';

const AuthRoute = Router();
const controller = container.resolve<IAuthRepository>('authRepository');

// Login
AuthRoute.post('/login', async (req, res, next) => {
	const data: UserLogin = req.body;

	try {
		const token = await controller.login(data);

		return res.status(200).json(token);
	} catch (error) {
		next(error);
	}
});

export default AuthRoute;
