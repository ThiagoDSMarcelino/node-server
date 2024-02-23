import { Router } from 'express';

import container from '../config/container';
import IAuthService from '../interfaces/IAuthService';
import authHandler from '../middleware/authHandler';

const AuthRoute = Router();
const service = container.resolve<IAuthService>('authService');

// Validate
AuthRoute.post('/', authHandler, async (_, res, __) => {
	return res.status(200);
});

export default AuthRoute;
