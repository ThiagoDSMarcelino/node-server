import { ServerErrorData } from './ServerError';

class AuthError {
	public static passwordMismatch(): ServerErrorData {
		const body = {
			title: 'Unauthorized',
			detail: 'Password does not match',
		};

		const data = {
			code: 401,
			body: body,
		};

		return data;
	}
}

export default AuthError;
