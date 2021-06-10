import { inject, injectable } from 'tsyringe';

import IBooksRepository from '@modules/libraries/repositories/interfaces/IBooksRepository';
import ILibrariesRepository from '@modules/libraries/repositories/interfaces/ILibrariesRepository';
import IStockLibraryRepository from '@modules/libraries/repositories/interfaces/IStockLibraryRepository';
import StockLibrary from '@shared/database/entities/StockLibrary';

import AddBookToStockLibraryService from './AddBookToStockLibraryService';
import CreateBookService from './CreateBookService';

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
		private booksRepository: IBooksRepository,
		@inject('LibrariesRepository')
		private librariesRepository: ILibrariesRepository,
		@inject('StockRepository')
		private stockRepository: IStockLibraryRepository,
	) {}

	public async execute({
		library_id,
		book,
		quantity,
	}: IRequest): Promise<StockLibrary> {
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
