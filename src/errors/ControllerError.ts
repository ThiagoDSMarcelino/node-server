class ControllerError extends Error {
	public code: number;
	public content: string;

	private constructor(code: number, message: string) {
		super();
		this.name = 'Controller Error';
		this.code = code;
		this.content = message;
	}

	public static invalidArgument(arg: string): ControllerError {
		const content = `Invalid argument: ${arg}`;
		return new ControllerError(400, content);
	}
}

export default ControllerError;
