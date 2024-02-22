import { ServerErrorData } from './ServerError';

class UserError {
	public static notFound(): ServerErrorData {
		const body = {
			title: 'Not Found',
			detail: 'User not found',
		};

		const data = {
			code: 404,
			body: body,
		};

		return data;
	}

	public static emailAlreadyExists(): ServerErrorData {
		const body = {
			title: 'Conflict',
			detail: 'Email already exists',
		};

		const data = {
			code: 409,
			body: body,
		};

		return data;
	}
}

export default UserError;
