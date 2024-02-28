import { NextFunction, Request, Response } from 'express';

import logger from '../../config/logger';
import error2Log from '../errors/Error2Log';
import ServerError from '../errors/ServerError';

const errorHandler = (
	error: Error,
	_: Request,
	res: Response,
	__: NextFunction,
) => {
	if (!(error instanceof ServerError)) {
		logger.error(error2Log(error));
		error = new ServerError(ServerError.internalServerError());
	}

	const serverError = error as ServerError;

	return res.status(serverError.code).send(serverError.body);
};

export default errorHandler;
