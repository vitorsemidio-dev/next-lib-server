/** @format */

import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateBookService from '../services/CreateBookService';

import BooksRepository from '../repositories/implementations/BooksRepository';

export default class BooksController {
	public async list(requet: Request, response: Response): Promise<Response> {
		const booksRepository = container.resolve(BooksRepository);

		const books = await booksRepository.find();

		return response.json(books);
	}

	public async create(request: Request, response: Response): Promise<Response> {
		const { name, author, pages } = request.body;
		const { filename: picture } = request.file;

		const booksRepository = container.resolve(BooksRepository);
		const createBookService = new CreateBookService(booksRepository);

		const book = await createBookService.execute({
			name,
			author,
			pages,
			picture,
		});

		return response.json(book);
	}
}
