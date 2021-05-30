import { injectable, inject } from 'tsyringe';

import StockLibrary from '@shared/database/entities/StockLibrary';
import AppError from '@shared/errors/AppError';

import BooksRepository from '../repositories/BooksRepository';
import LibrariesRepository from '../repositories/LibrariesRepository';
import StockRepository from '../repositories/StockLibraryRepository';

interface IRequest {
	library_id: string;
	book_id: string;
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
}
