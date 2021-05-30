import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateBookService from '../services/CreateBookService';
import UpdateBookService from '../services/UpdateBookService';

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

	public async show(request: Request, response: Response) {
		const { slug } = request.params;

		const booksRepository = container.resolve(BooksRepository);
		const book = await booksRepository.findBySlug(slug);

		const hostUrl = 'http://localhost:3333';
		const bookViewModel = {
			...book,
			imgUrl: `${hostUrl}/files/${book?.picture}`,
		};

		return response.json(bookViewModel);
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

	public async update(request: Request, response: Response) {
		const { book_id } = request.params;
		const { name, pages } = request.body;

		const booksRepository = container.resolve(BooksRepository);
		const updateBookService = new UpdateBookService(booksRepository);

		const bookUpdated = await updateBookService.execute({
			book_id,
			name,
			pages,
		});

		return response.status(204).json();
	}

	public async remove(request: Request, response: Response) {
		const { book_id } = request.params;

		const booksRepository = container.resolve(BooksRepository);

		await booksRepository.remove(book_id);

		return response.status(204).json(book_id);
	}
}
