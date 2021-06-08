import { inject, injectable } from 'tsyringe';
import { getManager } from 'typeorm';

import IRentBooksRepository from '@modules/libraries/repositories/interfaces/IRentBooksRepository';
import IStockLibraryRepository from '@modules/libraries/repositories/interfaces/IStockLibraryRepository';
import IUsersRepository from '../repositories/interfaces/IUsersRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
	user_id: string;
	book_id: string;
}

@injectable()
export default class ReturnBookService {
	constructor(
		@inject('UserRepository')
		private usersRepository: IUsersRepository,
		@inject('RentBooksRepository')
		private rentBookRepository: IRentBooksRepository,
		@inject('StockLibraryRepository')
		private stockLibraryRepository: IStockLibraryRepository,
	) {}
	public async execute({ user_id, book_id }: IRequest) {
		const booksRented = await this.rentBookRepository.findByUserId(user_id);

		const stockIds = booksRented.map((item) => item.stock_library_id);

		const stockWithBook = await this.stockLibraryRepository.findByIds(
			stockIds,
			['book'],
		);

		const stockWithExistentBooks = stockWithBook.filter((item) => item.book);

		const stock = stockWithExistentBooks.find(
			(item) => item.book_id === book_id,
		);

		if (!stock) {
			return;
		}

		const bookRented = booksRented.find(
			(item) => item.stock_library_id === stock.id,
		);

		if (!bookRented) {
			return;
		}

		await getManager().transaction(async (transactionalEntityManager) => {
			stock.quantity = stock.quantity + 1;
			await this.rentBookRepository.delete(bookRented.id);
			await transactionalEntityManager.save(stock);
		});

		return true;
	}
}
