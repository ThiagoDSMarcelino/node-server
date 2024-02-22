import { NextFunction, Request, Response } from 'express';

import ServerError from '../errors/ServerError';
import { error2Log } from '../shared/converters';
import logger from '../shared/logger';

const errorHandler = (
	error: Error,
	_: Request,
	res: Response,
	__: NextFunction,
) => {
	if (!(error instanceof ServerError)) {
		logger.error(error2Log(error));
		error = ServerError.internalServerError();
	}

	const serverError = error as ServerError;

	return res.status(serverError.code).send(serverError.body);
};

export default errorHandler;
