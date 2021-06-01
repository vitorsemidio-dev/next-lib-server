import { inject, injectable } from 'tsyringe';

import UsersRepository from '@modules/users/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
	user_id: string;
	book_id: string;
}
@injectable()
export default class UserRentBookService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: UsersRepository,
	) {}

	public async execute({ user_id, book_id }: IRequest): Promise<any> {
		console.log('UserRentBookService');
		console.log(`User Id: [${user_id}] | Book Id: [${book_id}]`);

		const userExists = await this.usersRepository.findById(user_id);

		if (!userExists) {
			// throw new AppError('User does not exists', 404)
			console.log('[ERROR 404]: User does not exists');
		}

		return {
			user_id,
			book_id,
		};
	}
}
