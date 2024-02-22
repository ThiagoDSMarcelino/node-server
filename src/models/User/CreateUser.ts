type CreateUser = {
	email: string;
	firstName: string;
	lastName: string | null;
	profilePicture: string | null;
	password: string;
	cpf: string;
	birthday: string;
	isAdmin: boolean | null;
};

export default CreateUser;
