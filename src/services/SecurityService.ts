import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import ISecurityService from '../interfaces/ISecurityService';

class SecurityService implements ISecurityService {
	private saltRounds: number = 10;
	private secret: string;

	constructor() {
		const secret = process.env.SECRET;

		if (secret === null || !secret)
			throw new Error('Secret key not set in ENV file'); // TODO: Change to custom error

		this.secret = secret;
	}

	async genJWT(payload: object): Promise<string> {
		const options = {
			expiresIn: '1h',
		};

		const token = jwt.sign(payload, this.secret, options);

		return token;
	}

	async checkJWT<T>(data: string): Promise<T> {
		return jwt.verify(data, this.secret) as T;
	}

	async encryptPassword(password: string): Promise<string> {
		const hashedPassword = await bcrypt.hash(password, this.saltRounds);

		return hashedPassword;
	}

	async comparePassword(
		user_password: string,
		password: string,
	): Promise<boolean> {
		return await bcrypt.compare(password, user_password);
	}
}

export default SecurityService;
