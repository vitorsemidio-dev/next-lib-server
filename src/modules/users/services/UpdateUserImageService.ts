import fs from 'fs';
import path from 'path';
import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/interfaces/IUsersRepository';
import uploadConfig from '@shared/config/upload';
import AppError from '@shared/errors/AppError';

interface IRequest {
	user_id: string;
	filename: string;
}

@injectable()
export default class UpdateUserImageService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
	) {}

	public async execute({ user_id, filename }: IRequest) {
		const user = await this.usersRepository.findById(user_id);

		if (!user) {
			throw new AppError('User does not found', 404);
		}

		if (user.avatar) {
			await this.deleteImageFile(user.avatar);
		}

		user.avatar = filename;

		const userUpdated = await this.usersRepository.update(user);

		return userUpdated;
	}

	private async deleteImageFile(filename: string) {
		const filePath = path.resolve(uploadConfig.destination, filename);

		try {
			await fs.promises.stat(filePath);
		} catch (err) {
			return;
		}

		await fs.promises.unlink(filePath);
	}
}
