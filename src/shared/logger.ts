import winston from 'winston';

import { logPath } from '../config/paths';

const logLevels = {
	error: 0,
	warn: 1,
	info: 2,
	debug: 3,
};

const getLogFileName = (): string => {
	const currentDate = new Date()
		.toISOString()
		.split('T')[0]
		.replace(/[:.]/g, '-'); // Replace colons and periods with hyphens

	return `${logPath}/${currentDate}.log`;
};

const logger = winston.createLogger({
	levels: logLevels,
	format: winston.format.simple(),
	transports: [new winston.transports.File({ filename: getLogFileName() })],
});

export default logger;
