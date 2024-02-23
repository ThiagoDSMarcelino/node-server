import { ServerErrorData } from './ServerError';

class EntityError {
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
}

export default EntityError;
