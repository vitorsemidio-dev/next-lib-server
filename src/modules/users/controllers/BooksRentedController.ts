import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

import RentBooksRepository from '@modules/libraries/repositories/RentBooksRepository';
import StockLibraryRepository from '@modules/libraries/repositories/StockLibraryRepository';

import ListBooksRentedService from '../services/ListBooksRentedService';
import ReturnBookService from '../services/ReturnBookService';

export default class BooksRentedController {
	public async list(request: Request, response: Response) {
		const { user_id } = request.params;

		const rentBookRepository = container.resolve(RentBooksRepository);
		const stockLibraryRepository = container.resolve(StockLibraryRepository);

		const listBooksRentedService = new ListBooksRentedService(
			rentBookRepository,
			stockLibraryRepository,
		);

		const booksRented = await listBooksRentedService.execute({
			user_id,
		});

		return response.json(classToClass(booksRented));
	}

	public async remove(request: Request, response: Response) {
		const { user_id } = request.params;
		const book_id = request.query.book_id as string;

		const rentBooksRepository = container.resolve(RentBooksRepository);
		const stockLibraryRepository = container.resolve(StockLibraryRepository);

		const returnBookService = new ReturnBookService(
			rentBooksRepository,
			stockLibraryRepository,
		);

		const result = await returnBookService.execute({
			book_id,
			user_id,
		});

		return response.json(result);
	}
}
