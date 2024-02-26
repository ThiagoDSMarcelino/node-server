interface ISecurityService {
	genJWT(payload: object): Promise<string>;
	checkJWT<T>(token: string): Promise<T>;
	encryptPassword(password: string): Promise<string>;
	comparePassword(user_password: string, password: string): Promise<boolean>;
}

export default ISecurityService;
