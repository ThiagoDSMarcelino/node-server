import { User } from '@prisma/client';

import UserDTO from '../models/User/UserDTO';

export const user2DTO = (user: User): UserDTO => {
	const DTO: UserDTO = {
		id: user.id,
		email: user.email,
		profile_picture: user.profile_picture,
		first_name: user.first_name,
		last_name: user.last_name,
		birthday: user.birthday,
		is_admin: user.is_admin,
	};

	return DTO;
};

export const error2Log = (error: Error): string => {
	const time = new Date().toLocaleTimeString();
	return `${time} | ${error.name} | ${error.message}\n`;
};
