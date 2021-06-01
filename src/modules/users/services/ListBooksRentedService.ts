import { injectable, inject } from 'tsyringe';

import Book from '@shared/database/entities/Book';
import StockLibraryRepository from '@modules/libraries/repositories/StockLibraryRepository';
import RentBooksRepository from '@modules/libraries/repositories/RentBooksRepository';

interface IResponse {
	user_id: string;
}

@injectable()
export default class ListBooksRentedService {
	constructor(
		@inject('RentBooksRepository')
		private rentBookRepository: RentBooksRepository,
		@inject('StockLibraryRepository')
		private stockLibraryRepository: StockLibraryRepository,
	) {}
	public async execute({ user_id }: IResponse): Promise<Book[]> {
		const rented = await this.rentBookRepository.findByUserId(user_id);

		const stockIds = rented.map((item) => item.stock_library_id);

		const stockWithBook = await this.stockLibraryRepository.findByIds(
			stockIds,
			['book'],
		);

		const booksRented = stockWithBook.map((item) => item.book);

		return booksRented;
	}
}
