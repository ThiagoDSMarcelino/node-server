interface ISecurityService {
	genJWT(payload: object): Promise<string>;
	checkJWT<T>(token: string): Promise<T>;
	encryptPassword(password: string): Promise<string>;
}

export default ISecurityService;
