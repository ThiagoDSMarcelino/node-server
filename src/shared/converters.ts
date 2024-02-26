import { User } from '@prisma/client';

import UserDTO from '../api/models/User/UserDTO';

export const user2DTO = (user: User): UserDTO => {
	const dto: UserDTO = {
		id: user.id,
		email: user.email,
		profilePicture: user.profilePicture,
		firstName: user.firstName,
		lastName: user.lastName,
		birthday: user.birthday,
		isAdmin: user.isAdmin,
	};

	return dto;
};

export const error2Log = (error: Error): string => {
	const time = new Date().toLocaleTimeString();
	return `${time} | ${error.name} | ${error.message}\n`;
};
