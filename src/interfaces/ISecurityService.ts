interface ISecurityService {
	genJWT(payload: object): Promise<string>;
	encryptPassword(password: string): Promise<string>;
}

export default ISecurityService;
