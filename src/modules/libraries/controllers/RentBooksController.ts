import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UsersRepository from '@modules/users/repositories/UsersRepository';

import BooksRepository from '../repositories/BooksRepository';

import UserRentBookService from '../services/UserRentBookService';
import RentBooksRepository from '../repositories/RentBooksRepository';

export default class RentBooksController {
	public async create(request: Request, response: Response) {
		const { user_id, book_id } = request.body;

		const usersRepository = container.resolve(UsersRepository);
		const booksRepository = container.resolve(BooksRepository);
		const rentBookRepository = container.resolve(RentBooksRepository);

		const rentBookService = new UserRentBookService(
			usersRepository,
			booksRepository,
			rentBookRepository,
		);

		const bookRented = await rentBookService.execute({
			user_id,
			book_id,
		});

		return response.json(bookRented);
	}
}
