import { ServerErrorData } from './ServerError';

class RouteError {
	public static unauthorized(): ServerErrorData {
		const body = {
			title: 'Unauthorized',
			detail: 'Unauthorized',
		};

		const data = {
			code: 401,
			body: body,
		};

		return data;
	}
}

export default RouteError;
