import ServerError from './ServerError';

class UserError {
	public static notFound(): ServerError {
		const body = {
			title: 'Not Found',
			detail: 'User not found',
		};

		const error = new ServerError(404, body);

		return error;
	}

	public static emailAlreadyExists(): ServerError {
		const body = {
			title: 'Conflict',
			detail: 'Email already exists',
		};

		const error = new ServerError(400, body);

		return error;
	}
}

export default UserError;
