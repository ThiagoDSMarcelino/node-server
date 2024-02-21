import ServerError from './ServerError';

class AuthError {
	public static passwordMismatch(): ServerError {
		const body = {
			title: 'Unauthorized',
			detail: 'Password does not match',
		};

		const error = new ServerError(401, body);

		return error;
	}
}

export default AuthError;
