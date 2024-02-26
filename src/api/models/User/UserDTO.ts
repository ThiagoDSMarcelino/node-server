type UserDTO = {
	id: string;
	email: string;
	profilePicture: string | null;
	firstName: string;
	lastName: string | null;
	birthday: Date;
	isAdmin: boolean;
};

export default UserDTO;
