import { NextFunction, Request, Response } from 'express';

import { isServerError } from '../interfaces/IServerError';

const errorHandler = (
	err: Error,
	_: Request,
	res: Response,
	__: NextFunction,
) => {
	if (isServerError(err)) {
		return res.status(err.code).send(err.content);
	}

	return res.status(500).send('Internal Server Error');
};

export default errorHandler;
