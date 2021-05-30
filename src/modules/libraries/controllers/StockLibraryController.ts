import { Response, Request } from 'express';
import { container } from 'tsyringe';

import BooksRepository from '../repositories/BooksRepository';
import LibrariesRepository from '../repositories/LibrariesRepository';
import StockLibraryRepository from '../repositories/StockLibraryRepository';

import AddBookToStockLibraryService from '../services/AddBookToStockLibraryService';
import ListStockLibraryService from '../services/ListStockLibraryService';

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
		const { library_id } = request.params;

		const stockLibraryService = new ListStockLibraryService();

		const stockLibrary = await stockLibraryService.execute({
			library_id,
		});

		const hostUrl = 'http://localhost:3333';

		const stockViewModel = stockLibrary.map((item) => {
			return {
				...item.book,
				quantity: item.quantity,
				imgUrl: `${hostUrl}/files/${item.book.picture}`,
			};
		});

		return response.json(stockViewModel);
	}

	public async registerBook(request: Request, response: Response) {
		const { library_id, book, quantity } = request.body;

		const booksRepository = container.resolve(BooksRepository);
		const librariesRepository = container.resolve(LibrariesRepository);
		const stockLibraryRepository = container.resolve(StockLibraryRepository);

		const addBookToStockLibraryService = new AddBookToStockLibraryService(
			booksRepository,
			librariesRepository,
			stockLibraryRepository,
		);

		const registerItem = await addBookToStockLibraryService.executeRefactor({
			library_id,
			book,
			quantity,
		});

		return response.json(registerItem);
	}
}
