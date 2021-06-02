import { injectable, inject } from 'tsyringe';

import IRentBooksRepository from '@modules/libraries/repositories/interfaces/IRentBooksRepository';
import IStockLibraryRepository from '@modules/libraries/repositories/interfaces/IStockLibraryRepository';
import Book from '@shared/database/entities/Book';

interface IResponse {
	user_id: string;
}

@injectable()
export default class ListBooksRentedService {
	constructor(
		@inject('RentBooksRepository')
		private rentBookRepository: IRentBooksRepository,
		@inject('StockLibraryRepository')
		private stockLibraryRepository: IStockLibraryRepository,
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
