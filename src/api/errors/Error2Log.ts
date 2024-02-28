const error2Log = (error: Error): string => {
	const time = new Date().toLocaleTimeString();
	return `${time} | ${error.name} | ${error.message}\n`;
};

export default error2Log;
