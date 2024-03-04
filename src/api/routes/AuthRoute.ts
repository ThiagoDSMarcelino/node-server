import { Router } from 'express';

import authHandler from '../middleware/authHandler';

const AuthRoute = Router();

// Authenticate
AuthRoute.all('/', authHandler, async (_, res, __) => {
	return res.status(200).json(res.locals.user);
});

export default AuthRoute;
