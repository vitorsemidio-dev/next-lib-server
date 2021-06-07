import { inject, injectable } from 'tsyringe';

import User from '@shared/database/entities/User';
import AppError from '@shared/errors/AppError';
import HashProvider from '@utils/HashProvider';

import IUsersRepository from '../repositories/interfaces/IUsersRepository';

interface IRequest {
	id: string;
	name: string;
	email: string;
	password?: string;
}

@injectable()
export default class UpdateUserService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
	) {}

	public async execute({ id, name, email, password }: IRequest): Promise<User> {
		const user = await this.usersRepository.findById(id);

		if (!user) {
			throw new AppError('Library does not found', 404);
		}

		if (email && email !== user.email) {
			const isEmailAvailable =
				await this.usersRepository.checkEmailAvailability(email);
			if (!isEmailAvailable) {
				throw new AppError('E-mail is already used', 400);
			}
		}

		const hashedPassword = password
			? await HashProvider.generateHash(password)
			: user.password;

		const newDataUser = Object.assign(user, {
			name: name || user.name,
			email: email || user.email,
			password: hashedPassword,
		});

		const userUpdated = await this.usersRepository.update(newDataUser);

		return userUpdated;
	}
}
