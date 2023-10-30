type ServerError = {
	content: string;
	code: number;
};

export const isServerError = (obj: any): obj is ServerError => {
	return 'content' in obj && 'code' in obj;
};

export default ServerError;
