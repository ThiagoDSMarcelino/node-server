import { Router } from 'express';

import authHandler from '../middleware/authHandler';

const AuthRoute = Router();

// Validate
AuthRoute.all('/', authHandler, async (_, res, __) => {
	return res.status(200).json();
});

export default AuthRoute;
