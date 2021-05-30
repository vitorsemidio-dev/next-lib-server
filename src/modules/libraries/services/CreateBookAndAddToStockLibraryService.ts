import { inject, injectable } from 'tsyringe';

import CreateBookService from './CreateBookService';
import AddBookToStockLibraryService from './AddBookToStockLibraryService';

import BooksRepository from '../repositories/BooksRepository';
import LibrariesRepository from '../repositories/LibrariesRepository';
import StockRepository from '../repositories/StockLibraryRepository';

interface IRequest {
	library_id: string;
	book: {
		name: string;
		author: string;
		pages: number;
		picture: string;
	};
	quantity: number;
}

@injectable()
export default class CreateBookAndAddToStockLibraryService {
	constructor(
		@inject('BooksRepository')
		private booksRepository: BooksRepository,
		@inject('LibrariesRepository')
		private librariesRepository: LibrariesRepository,
		@inject('StockRepository')
		private stockRepository: StockRepository,
	) {}

	public async execute({ library_id, book, quantity }: IRequest): Promise<any> {
		const createBookService = new CreateBookService(this.booksRepository);
		const addBookToStockLibraryService = new AddBookToStockLibraryService(
			this.booksRepository,
			this.librariesRepository,
			this.stockRepository,
		);

		const bookCreated = await createBookService.execute({
			name: book.name,
			author: book.author,
			pages: book.pages,
			picture: book.picture,
		});

		const stock = await addBookToStockLibraryService.execute({
			library_id,
			book_id: bookCreated.id,
			quantity,
		});

		return stock;
	}
}
