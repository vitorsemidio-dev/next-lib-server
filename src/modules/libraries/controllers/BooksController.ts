/** @format */

import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateBookService from '../services/CreateBookService';

import BooksRepository from '../repositories/BooksRepository';

export default class BooksController {
	public async list(requet: Request, response: Response): Promise<Response> {
		const booksRepository = container.resolve(BooksRepository);

		const books = await booksRepository.find();

		const hostUrl = 'http://localhost:3333';

		const booksViewModel = books.map((item) => ({
			...item,
			imgUrl: `${hostUrl}/files/${item.picture}`,
		}));

		return response.json(booksViewModel);
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
