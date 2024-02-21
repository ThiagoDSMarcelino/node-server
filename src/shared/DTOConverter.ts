import { User } from '@prisma/client';

import UserDTO from '../models/User/UserDTO';

class DTOConverter {
	public static convertUser(user: User): UserDTO {
		const DTO: UserDTO = {
			email: user.email,
			profile_picture: user.profile_picture,
			first_name: user.first_name,
			last_name: user.last_name,
			birthday: user.birthday,
			is_admin: user.is_admin,
		};

		return DTO;
	}
}

export default DTOConverter;
