import { ServerErrorData } from './ServerError';

class UserError {
	public static notFound(): ServerErrorData {
		return {
			code: 404,
			title: 'Not Found',
			detail: 'User not found',
		};
	}

	public static emailAlreadyExists(): ServerErrorData {
		return {
			code: 400,
			title: 'Bad Request',
			detail: 'Email already exists',
		};
	}
}

export default UserError;
