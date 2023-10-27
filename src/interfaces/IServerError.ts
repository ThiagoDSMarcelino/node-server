type IServerError = {
	content: string;
	code: number;
};

export const isServerError = (obj: any): obj is IServerError => {
	return 'content' in obj && 'code' in obj;
};

export default IServerError;
