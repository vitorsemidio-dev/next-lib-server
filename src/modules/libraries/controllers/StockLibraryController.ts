import { Response, Request } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import BooksRepository from '@modules/libraries/repositories/BooksRepository';
import LibrariesRepository from '@modules/libraries/repositories/LibrariesRepository';
import StockLibraryRepository from '@modules/libraries/repositories/StockLibraryRepository';
import CreateBookAndAddToStockLibraryService from '@modules/libraries/services/CreateBookAndAddToStockLibraryService';
import ListStockLibraryService from '@modules/libraries/services/ListStockLibraryService';

export default class StockLibraryController {
	public async create(request: Request, response: Response) {
		const { book, quantity } = request.body;
		const library_id = request.library.id;

		const booksRepository = container.resolve(BooksRepository);
		const librariesRepository = container.resolve(LibrariesRepository);
		const stockLibraryRepository = container.resolve(StockLibraryRepository);

		const createBookAndAddToStockLibraryService =
			new CreateBookAndAddToStockLibraryService(
				booksRepository,
				librariesRepository,
				stockLibraryRepository,
			);

		const registerItem = await createBookAndAddToStockLibraryService.execute({
			library_id,
			book,
			quantity,
		});

		const registerViewModel = classToClass(registerItem);

		return response.json(registerViewModel);
	}

	public async list(request: Request, response: Response) {
		const { library_id } = request.params;

		const librariesRepository = container.resolve(LibrariesRepository);
		const stockLibraryRepository = container.resolve(StockLibraryRepository);

		const stockLibraryService = new ListStockLibraryService(
			librariesRepository,
			stockLibraryRepository,
		);

		const stockLibrary = await stockLibraryService.execute({
			library_id,
		});

		const stockViewModel = stockLibrary.map((item) => {
			return {
				...classToClass(item.book),
				quantity: item.quantity,
			};
		});

		return response.json(stockViewModel);
	}
}
