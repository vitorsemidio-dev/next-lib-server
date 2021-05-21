/** @format */

import { getRepository, In, Repository } from 'typeorm';

import StockLibrary from 'shared/database/entities/StockLibrary';
import RentBook from '@shared/database/entities/RentBook';

interface IResponse {
	user_id: string;
}

export default class ListBooksRentedService {
	private rentBookRepository: Repository<RentBook>;
	private stockLibraryRepository: Repository<StockLibrary>;

	constructor() {
		this.rentBookRepository = getRepository(RentBook);
		this.stockLibraryRepository = getRepository(StockLibrary);
	}
	public async execute({ user_id }: IResponse): Promise<any[]> {
		const rented = await this.rentBookRepository.find({
			where: {
				user_id,
			},
		});

		const stockIds = rented.map((item) => item.stock_library_id);

		const stockWithBook = await this.stockLibraryRepository.find({
			where: {
				id: In(stockIds),
			},
			relations: ['book'],
		});

		const booksRented = stockWithBook.map((item) => item.book);

		return booksRented;
	}
}
