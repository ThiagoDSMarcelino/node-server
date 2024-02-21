import { NextFunction, Request, Response } from 'express';

import ServerError from '../errors/ServerError';

const errorHandler = (
	error: Error,
	_: Request,
	res: Response,
	__: NextFunction,
) => {
	if (!(error instanceof ServerError)) {
		error = ServerError.internalServerError();
	}

	const serverError = error as ServerError;

	return res.status(serverError.code).send(serverError.body);
};

export default errorHandler;
