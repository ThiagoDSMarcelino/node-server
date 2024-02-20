type CreateUser = {
	email: string;
	first_name: string;
	last_name: string | null;
	profile_picture: string | null;
	password: string;
	cpf: string;
	birthday: Date;
	is_admin: boolean | null;
};

export default CreateUser;
