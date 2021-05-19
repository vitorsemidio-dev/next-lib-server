/** @format */

import { getCustomRepository } from 'typeorm';

import StockLibrary from '@shared/database/entities/StockLibrary';
import AppError from '@shared/errors/AppError';

import BooksRepository from '../repositories/implementations/BooksRepository';
import LibrariesRepository from '../repositories/LibrariesRepository';
import StockRepository from '../repositories/StockLibraryRepository';

interface IRequest {
	library_id: string;
	book_id: string;
	quantity: number;
}

export default class AddBookToStockLibraryService {
	private booksRepository: BooksRepository;
	private librariesRepository: LibrariesRepository;
	private stockRepository: StockRepository;

	constructor() {
		this.booksRepository = getCustomRepository(BooksRepository);
		this.librariesRepository = getCustomRepository(LibrariesRepository);
		this.stockRepository = getCustomRepository(StockRepository);
	}

	public async execute({
		library_id,
		book_id,
		quantity,
	}: IRequest): Promise<StockLibrary> {
		let library = await this.librariesRepository.findOne(library_id);

		if (!library) throw new AppError('Library does not exists', 400);

		let book = await this.booksRepository.findById(book_id);

		if (!book) throw new AppError('Book does not exists', 400);

		const stockItem = this.stockRepository.create({
			book,
			library,
			quantity,
		});

		await this.stockRepository.save(stockItem);

		return stockItem;
	}
}
