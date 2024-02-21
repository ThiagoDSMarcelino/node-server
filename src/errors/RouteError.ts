import ServerError from './ServerError';

class RouteError {
	public static unauthorized(): ServerError {
		const body = {
			title: 'Unauthorized',
			detail: 'Unauthorized',
		};

		const error = new ServerError(401, body);

		return error;
	}
}

export default RouteError;
