/** @format */

import { Response, Request } from 'express';

import { getCustomRepository } from 'typeorm';

import StockLibraryRepository from '../repositories/StockLibraryRepository';
import AddBookToStockLibraryService from '../services/AddBookToStockLibraryService';

let stockLibraryRepository: StockLibraryRepository;
let addBookToStockLibraryService: AddBookToStockLibraryService;

export default class StockLibraryController {
	public async create(request: Request, response: Response) {
		const { library_id, book_id, quantity } = request.body;
		addBookToStockLibraryService = new AddBookToStockLibraryService();

		const stockItem = await addBookToStockLibraryService.execute({
			library_id,
			book_id,
			quantity,
		});

		return response.json(stockItem);
	}

	public async list(request: Request, response: Response) {
		stockLibraryRepository = getCustomRepository(StockLibraryRepository);

		const stockLibrary = await stockLibraryRepository.find();

		return response.json(stockLibrary);
	}
}
