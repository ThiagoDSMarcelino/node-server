import { NextFunction, Request, Response } from 'express';

import ServerError, { ServerErrorResponse } from '../errors/ServerError';

const errorHandler = (
	err: Error,
	_: Request,
	res: Response,
	__: NextFunction,
) => {
	if (ServerError.isServerError(err)) {
		const { data } = err;
		const body: ServerErrorResponse = {
			title: data.title,
			detail: data.detail,
		};

		return res.status(data.code).send(body);
	}

	return res.status(500).send('Internal Server Error');
};

export default errorHandler;
