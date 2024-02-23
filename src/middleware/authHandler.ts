import { NextFunction, Request, Response } from 'express';

import container from '../config/container';
import RouteError from '../errors/RouteError';
import ServerError from '../errors/ServerError';
import IAuthService from '../interfaces/IAuthService';

const service = container.resolve<IAuthService>('authService');

const authHandler = async (req: Request, res: Response, next: NextFunction) => {
	const authorization = req.headers.authorization;

	if (!authorization) {
		throw new ServerError(RouteError.unauthorized());
	}
	
	const base64Credentials = authorization.split(' ')[1]; // Get the part after "Basic "
	const decodedCredentials = atob(base64Credentials);
	const [username, password] = decodedCredentials.split(':');
	const user = await service.login(username, password);
	res.locals.user = user;

	next();
};

export default authHandler;
