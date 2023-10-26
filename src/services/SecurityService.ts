import ISecurityService from '../interfaces/ISecurityService';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class SecurityService implements ISecurityService {
	private saltRounds: number = 10;

	async genJWT(payload: object): Promise<string> {
		const options = {
			expiresIn: '1h',
		};

		const secret = process.env.SECRET;

		if (secret === null || !secret) throw new Error();

		const token = jwt.sign(payload, secret, options);

		return token;
	}

	async encryptPassword(password: string): Promise<string> {
		const hashedPassword = await bcrypt.hash(password, this.saltRounds);

		return hashedPassword;
	}
}

export default SecurityService;
