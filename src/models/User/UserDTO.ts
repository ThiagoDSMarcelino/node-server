type UserDTO = {
	id: string;
	email: string;
	profile_picture: string | null;
	first_name: string;
	last_name: string | null;
	birthday: Date;
	is_admin: boolean;
};

export default UserDTO;
