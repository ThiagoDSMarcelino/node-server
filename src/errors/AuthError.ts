import { ServerErrorData } from './ServerError';

class AuthError {
	public static passwordMismatch(): ServerErrorData {
		return {
			code: 400,
			title: 'Bad Request',
			detail: 'Password mismatch',
		};
	}
}

export default AuthError;
