interface ISecurityService {
	genJWT(payload: object): Promise<string>;
	checkJWT<T>(token: string): Promise<T>;
	encryptPassword(password: string): Promise<string>;
	comparePassword(realPassword: string, password: string): Promise<boolean>;
}

export default ISecurityService;
