import { NextFunction, Request, Response } from 'express';

import RouteError from '../errors/RouteError';

const authHandler = (req: Request, _: Response, next: NextFunction) => {
	const { token } = req.headers;

	if (!token) {
		throw RouteError.unauthorized();
	}

	next();
};

export default authHandler;
