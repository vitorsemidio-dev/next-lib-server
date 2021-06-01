import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UsersRepository from '@modules/users/repositories/UsersRepository';

import UserRentBookService from '../services/UserRentBookService';

export default class RentBooksController {
	public async create(request: Request, response: Response) {
		const { user_id, library_id, book_id } = request.body;

		const usersRepository = container.resolve(UsersRepository);
		const rentBookService = new UserRentBookService(usersRepository);

		const bookRented = await rentBookService.execute({
			user_id,
			book_id,
		});

		return response.json(bookRented);
	}
}
