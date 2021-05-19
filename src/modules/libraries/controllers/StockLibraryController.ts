/** @format */

import { Response, Request } from 'express';
import { container } from 'tsyringe';

import BooksRepository from '../repositories/implementations/BooksRepository';
import LibrariesRepository from '../repositories/implementations/LibrariesRepository';
import StockLibraryRepository from '../repositories/implementations/StockLibraryRepository';

import AddBookToStockLibraryService from '../services/AddBookToStockLibraryService';

export default class StockLibraryController {
	public async create(request: Request, response: Response) {
		const { library_id, book_id, quantity } = request.body;

		const booksRepository = container.resolve(BooksRepository);
		const librariesRepository = container.resolve(LibrariesRepository);
		const stockLibraryRepository = container.resolve(StockLibraryRepository);

		const addBookToStockLibraryService = new AddBookToStockLibraryService(
			booksRepository,
			librariesRepository,
			stockLibraryRepository,
		);

		const stockItem = await addBookToStockLibraryService.execute({
			library_id,
			book_id,
			quantity,
		});

		return response.json(stockItem);
	}

	public async list(request: Request, response: Response) {
		const stockLibraryRepository = new StockLibraryRepository();

		const stockLibrary = await stockLibraryRepository.find();

		return response.json(stockLibrary);
	}
}
