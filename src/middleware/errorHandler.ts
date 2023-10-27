import { NextFunction, Request, Response } from 'express';

import ControllerError from '../errors/ControllerError';

const errorHandler = (
	err: Error,
	_: Request,
	res: Response,
	__: NextFunction,
) => {
	if (err instanceof ControllerError) {
		return res.status(err.code).send(err.content);
	}

	return res.status(500).send('Internal Server Error');
};

export default errorHandler;
