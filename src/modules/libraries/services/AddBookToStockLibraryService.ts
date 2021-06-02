import { injectable, inject } from 'tsyringe';

import IBooksRepository from '@modules/libraries/repositories/interfaces/IBooksRepository';
import ILibrariesRepository from '@modules/libraries/repositories/interfaces/ILibrariesRepository';
import IStockLibraryRepository from '@modules/libraries/repositories/interfaces/IStockLibraryRepository';
import StockLibrary from '@shared/database/entities/StockLibrary';
import AppError from '@shared/errors/AppError';

interface IRequest {
	library_id: string;
	book_id: string;
	quantity: number;
}

@injectable()
export default class AddBookToStockLibraryService {
	constructor(
		@inject('BooksRepository')
		private booksRepository: IBooksRepository,
		@inject('LibrariesRepository')
		private librariesRepository: ILibrariesRepository,
		@inject('StockRepository')
		private stockLibraryRepository: IStockLibraryRepository,
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

		const stockItem = await this.stockLibraryRepository.create({
			book,
			library,
			quantity,
		});

		return stockItem;
	}
}
