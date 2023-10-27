import IServerError from '../interfaces/IServerError';

class ControllerError extends Error implements IServerError {
	public code: number;
	public content: string;

	private constructor(code: number, message: string) {
		super();
		this.name = 'Controller Error';
		this.code = code;
		this.content = message;
	}

	public static invalidArgument(message: string): ControllerError {
		const content = `Invalid argument: ${message}`;
		return new ControllerError(400, content);
	}
}

export default ControllerError;
