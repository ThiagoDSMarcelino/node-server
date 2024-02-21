import { ServerErrorData } from './ServerError';

class RouteError {
	public static unauthorized(): ServerErrorData {
		return {
			code: 401,
			title: 'Unauthorized',
			detail: 'You are not authorized to access this resource',
		};
	}
}

export default RouteError;
