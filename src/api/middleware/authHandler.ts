import { NextFunction, Request, Response } from 'express';

import container from '../../config/container';
import IAuthService from '../../interfaces/Base/IAuthService';
import AuthError from '../errors/AuthError';
import ServerError from '../errors/ServerError';

const service = container.resolve<IAuthService>('authService');

const authHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const authorization = req.headers.authorization;

		if (!authorization) {
			throw new ServerError(AuthError.lackOfCredentials());
		}

		const base64Credentials = authorization.split(' ')[1]; // Get the part after "Basic "
		const decodedCredentials = atob(base64Credentials);
		const [username, password] = decodedCredentials.split(':');
		const user = await service.login(username, password);
		res.locals.user = user;

		next();
	} catch (error) {
		next(error);
	}
};

export default authHandler;
