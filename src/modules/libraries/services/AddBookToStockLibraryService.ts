import { injectable, inject } from 'tsyringe';

import StockLibrary from '@shared/database/entities/StockLibrary';
import AppError from '@shared/errors/AppError';

import CreateBookService from './CreateBookService';

import BooksRepository from '../repositories/BooksRepository';
import LibrariesRepository from '../repositories/LibrariesRepository';
import StockRepository from '../repositories/StockLibraryRepository';

interface IRequest {
	library_id: string;
	book_id: string;
	quantity: number;
}

interface IRequestRefactor {
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
export default class AddBookToStockLibraryService {
	constructor(
		@inject('BooksRepository')
		private booksRepository: BooksRepository,
		@inject('LibrariesRepository')
		private librariesRepository: LibrariesRepository,
		@inject('StockRepository')
		private stockRepository: StockRepository,
	) {}

	public async execute({
		library_id,
		book_id,
		quantity,
	}: IRequest): Promise<StockLibrary> {
		let library = await this.librariesRepository.findById(library_id);

		if (!library) throw new AppError('Library does not exists', 400);

		let book = await this.booksRepository.findById(book_id);

		if (!book) throw new AppError('Book does not exists', 400);

		const stockItem = await this.stockRepository.create({
			book,
			library,
			quantity,
		});

		return stockItem;
	}

	public async executeRefactor({
		library_id,
		book,
		quantity,
	}: IRequestRefactor): Promise<any> {
		const createBookService = new CreateBookService(this.booksRepository);
		const bookCreated = await createBookService.execute({
			name: book.name,
			author: book.author,
			pages: book.pages,
			picture: book.picture,
		});

		const stock = await this.execute({
			library_id,
			book_id: bookCreated.id,
			quantity,
		});

		// const stock = {
		// 	library_id,
		// 	book,
		// 	quantity,
		// };

		return stock;
	}
}
