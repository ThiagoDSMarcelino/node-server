class ServerError extends Error {
	data: ServerErrorData;

	constructor(data: ServerErrorData) {
		super(data.detail);
		this.data = data;
	}

	public static isServerError(error: Error): error is ServerError {
		return error instanceof Error;
	}
}

export type ServerErrorData = {
	code: number;
	title: string;
	detail: string;
};

export type ServerErrorResponse = {
	title: string;
	detail: string;
};

export default ServerError;
