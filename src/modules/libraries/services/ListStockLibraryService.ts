/** @format */

import {} from 'typeorm';
import { container } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Library from '@shared/database/entities/Library';
import Book from '@shared/database/entities/Book';

import BooksRepository from '../repositories/BooksRepository';
import LibrariesRepository from '../repositories/LibrariesRepository';
import StockLibraryRepository from '../repositories/StockLibraryRepository';

interface IRequest {
	library_id: string;
}

interface IResponse {
	library: Library;
	books: Book[];
}

export default class ListStockLibrary {
	private booksRepository: BooksRepository;
	private librariesRepository: LibrariesRepository;
	private stockLibraryRepository: StockLibraryRepository;

	constructor() {
		this.booksRepository = container.resolve('BooksRepository');
		this.librariesRepository = container.resolve('LibrariesRepository');
		this.stockLibraryRepository = container.resolve('StockLibraryRepository');
	}

	public async execute({ library_id }: IRequest): Promise<IResponse> {
		const library = await this.librariesRepository.findById(library_id);

		if (!library) throw new AppError('Library does not found', 404);

		const stocks = await this.stockLibraryRepository.findStocksWithLibraryId(
			library_id,
		);

		if (!stocks || stocks.length === 0) {
			throw new AppError('Library without books', 404);
		}

		const booksId = stocks.map((item) => item.book_id);

		const books = await this.booksRepository.findBooksByIds(booksId);

		return {
			library,
			books,
		};
	}
}
