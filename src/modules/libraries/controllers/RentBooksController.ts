import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { getRepository } from 'typeorm';

import StockLibraryRepository from '@modules/libraries/repositories/StockLibraryRepository';
import UsersRepository from '@modules/users/repositories/UsersRepository';
import RentBook from '@shared/database/entities/RentBook';

import BooksRepository from '../repositories/BooksRepository';

import UserRentBookService from '../services/UserRentBookService';
import RentBooksRepository from '../repositories/RentBooksRepository';

export default class RentBooksController {
	public async create(request: Request, response: Response) {
		const { user_id, library_id, book_id } = request.body;

		const rentBookRepository = container.resolve(RentBooksRepository);

		const stockLibraryRepository = container.resolve(StockLibraryRepository);
		const usersRepository = container.resolve(UsersRepository);
		const booksRepository = container.resolve(BooksRepository);
		const rentBookService = new UserRentBookService(
			usersRepository,
			booksRepository,
			stockLibraryRepository,
			rentBookRepository,
		);

		const bookRented = await rentBookService.execute({
			user_id,
			book_id,
		});

		return response.json(bookRented);
	}
}
