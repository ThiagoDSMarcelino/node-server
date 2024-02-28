import { Router } from 'express';

import { user2DTO } from '../../shared/converters';
import authHandler from '../middleware/authHandler';

const AuthRoute = Router();

// Validate
AuthRoute.all('/', authHandler, async (_, res, __) => {
	return res.status(200).json(user2DTO(res.locals.user));
});

export default AuthRoute;
