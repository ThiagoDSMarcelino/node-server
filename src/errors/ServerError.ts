type ServerErrorBody = {
	title: string;
	detail: string;
};

class ServerError extends Error {
	code: number;
	body: ServerErrorBody;

	constructor(code: number, body: ServerErrorBody) {
		super();
		this.code = code;
		this.body = body;
	}

	public static isServerError(obj: Error): obj is ServerError {
		return obj instanceof ServerError;
	}

	public static internalServerError(): ServerError {
		const body = {
			title: 'Internal Server Error',
			detail: 'Internal Server Error',
		};

		const error = new ServerError(500, body);

		return error;
	}

	public static notImplemented(): ServerError {
		const body = {
			title: 'Not Implemented',
			detail: 'Not Implemented',
		};

		const error = new ServerError(501, body);

		return error;
	}
}

export default ServerError;
