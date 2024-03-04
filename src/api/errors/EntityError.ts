import { ServerErrorData } from './ServerError';

class EntityError {
	static forbidden(): ServerErrorData {
		const body = {
			title: 'Forbidden',
			detail: 'You are not allowed to perform this action',
		};

		const data = {
			code: 403,
			body: body,
		};

		return data;
	}

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

	static propertyAlreadyExists(prop: string): ServerErrorData {
		const body = {
			title: 'Conflict',
			detail: `The ${prop} property is already being used`,
		};

		const data = {
			code: 409,
			body: body,
		};

		return data;
	}

	public static notAllowed(): ServerErrorData {
		const body = {
			title: 'Not Allowed',
			detail: 'You are not allowed to perform this action',
		};

		const data = {
			code: 403,
			body: body,
		};

		return data;
	}
}

export default EntityError;
