import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import BooksRepository from '../repositories/BooksRepository';
import CreateBookService from '../services/CreateBookService';
import UpdateBookService from '../services/UpdateBookService';
import UpdateImageBookService from '../services/UpdateImageBookService';
import CheckNameAvailabilityService from '../services/CheckNameAvailabilityService';

export default class BooksController {
	public async list(requet: Request, response: Response): Promise<Response> {
		const booksRepository = container.resolve(BooksRepository);

		const books = await booksRepository.find();

		const booksViewModel = books.map((item) => ({
			...classToClass(item),
		}));

		return response.json(booksViewModel);
	}

	public async show(request: Request, response: Response) {
		const { slug } = request.params;

		const booksRepository = container.resolve(BooksRepository);
		const book = await booksRepository.findBySlug(slug);

		const bookViewModel = {
			...classToClass(book),
			quantity: book?.stockLibrary[0].quantity,
		};

		return response.json(bookViewModel);
	}

	public async create(request: Request, response: Response): Promise<Response> {
		const { name, author, pages } = request.body;
		const picture = request.file.filename || '';

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
		const { name, pages, author, quantity } = request.body;

		const booksRepository = container.resolve(BooksRepository);
		const updateBookService = new UpdateBookService(booksRepository);

		const bookUpdated = await updateBookService.execute({
			book_id,
			name,
			pages,
			author,
			quantity,
		});

		return response.json(classToClass(bookUpdated));
	}

	public async remove(request: Request, response: Response) {
		const { book_id } = request.params;

		const booksRepository = container.resolve(BooksRepository);

		await booksRepository.remove(book_id);

		return response.status(204).json(book_id);
	}

	public async updateAvatar(request: Request, response: Response) {
		const { filename } = request.file;
		const { book_id } = request.params;

		const booksRepository = container.resolve(BooksRepository);

		const updateImageBookService = new UpdateImageBookService(booksRepository);

		const bookUpdated = await updateImageBookService.execute({
			filename,
			book_id,
		});

		return response.json({
			bookUpdated,
		});
	}

	public async checkNameAvailability(request: Request, response: Response) {
		const { name } = request.body;

		const booksRepository = container.resolve(BooksRepository);

		const checkNameAvailabilityService = new CheckNameAvailabilityService(
			booksRepository,
		);

		const isNameAvailable = await checkNameAvailabilityService.execute(name);

		return response.json({
			available: isNameAvailable,
			name,
		});
	}
}
