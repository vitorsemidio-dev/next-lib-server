import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import BooksRepository from '@modules/libraries/repositories/BooksRepository';
import CreateBookService from '@modules/libraries/services/CreateBookService';
import UpdateBookService from '@modules/libraries/services/UpdateBookService';
import UpdateImageBookService from '@modules/libraries/services/UpdateImageBookService';
import CheckNameAvailabilityService from '@modules/libraries/services/CheckNameAvailabilityService';

export default class BooksController {
	public async list(requet: Request, response: Response) {
		const booksRepository = container.resolve(BooksRepository);

		const books = await booksRepository.find();

		const booksViewModel = classToClass(books);

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

	public async create(request: Request, response: Response) {
		const { name, author, pages } = request.body;
		const picture = request.file ? request.file.filename : '';

		const booksRepository = container.resolve(BooksRepository);
		const createBookService = new CreateBookService(booksRepository);

		const book = await createBookService.execute({
			name,
			author,
			pages,
			picture,
		});

		const bookViewModel = classToClass(book);

		return response.json(bookViewModel);
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

		const bookUpdatedViewModel = classToClass(bookUpdated);

		return response.json(bookUpdatedViewModel);
	}

	public async remove(request: Request, response: Response) {
		const { book_id } = request.params;

		const booksRepository = container.resolve(BooksRepository);

		await booksRepository.remove(book_id);

		return response.status(204).json();
	}

	public async updateImage(request: Request, response: Response) {
		const { filename } = request.file;
		const { book_id } = request.params;

		const booksRepository = container.resolve(BooksRepository);

		const updateImageBookService = new UpdateImageBookService(booksRepository);

		const bookUpdated = await updateImageBookService.execute({
			filename,
			book_id,
		});

		const bookUpdatedViewModel = classToClass(bookUpdated);

		return response.json(bookUpdatedViewModel);
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
