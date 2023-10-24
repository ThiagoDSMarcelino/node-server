import { Request, Response, NextFunction } from 'express';
import { AwilixContainer } from 'awilix';

const injectContainer = (container: AwilixContainer) => {
	return (req: Request, _: Response, next: NextFunction) => {
		req.container = container;
		next();
	};
};

export default injectContainer;
