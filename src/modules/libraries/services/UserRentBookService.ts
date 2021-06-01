import { inject, injectable } from 'tsyringe';

import UsersRepository from '@modules/users/repositories/UsersRepository';

interface IRequest {
	user_id: string;
	book_id: string;
}
@injectable()
export default class UserRentBookService {
	constructor(
		@inject('UsersRepository')
		usersRepository: UsersRepository,
	) {}

	public async execute({ user_id, book_id }: IRequest): Promise<any> {
		console.log('UserRentBookService');
		console.log(`User Id: [${user_id}] | Book Id: [${book_id}]`);

		return {
			user_id,
			book_id,
		};
	}
}
