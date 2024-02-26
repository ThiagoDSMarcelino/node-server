import { ServerErrorData } from './ServerError';

class AuthError {
	public static lackOfCredentials(): ServerErrorData {
		const body = {
			title: 'Unauthorized',
			detail: 'Lack of credentials',
		};

		const data = {
			code: 401,
			body: body,
		};

		return data;
	}

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

	public static adminOnly(): ServerErrorData {
		const body = {
			title: 'Unauthorized',
			detail: 'Only admin can perform this action',
		};

		const data = {
			code: 401,
			body: body,
		};

		return data;
	}
}

export default AuthError;
