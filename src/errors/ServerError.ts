type ServerErrorBody = {
	title: string;
	detail: string;
};

export type ServerErrorData = {
	code: number;
	body: ServerErrorBody;
};

class ServerError extends Error {
	code: number;
	body: ServerErrorBody;

	constructor(data: ServerErrorData) {
		super();
		this.code = data.code;
		this.body = data.body;
	}

	public static isServerError(obj: Error): obj is ServerError {
		return obj instanceof ServerError;
	}

	public static internalServerError(): ServerErrorData {
		const body = {
			title: 'Internal Server Error',
			detail: 'Internal Server Error',
		};

		const data = {
			code: 500,
			body: body,
		};

		return data;
	}

	public static notImplemented(): ServerErrorData {
		const body = {
			title: 'Not Implemented',
			detail: 'Not Implemented',
		};

		const data = {
			code: 501,
			body: body,
		};

		return data;
	}
}

export default ServerError;
