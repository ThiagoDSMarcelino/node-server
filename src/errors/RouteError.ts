import IServerError from '../interfaces/IServerError';

class RouteError extends Error implements IServerError {
	public code: number;
	public content: string;

	private constructor(code: number, message: string) {
		super();
		this.name = 'Route Error';
		this.code = code;
		this.content = message;
	}

	public static unauthorized(): RouteError {
		const content = `You're unauthorized to access this route`;
		return new RouteError(401, content);
	}
}

export default RouteError;
