import { inject, injectable } from 'tsyringe';

import BooksRepository from '@modules/libraries/repositories/BooksRepository';

import AppError from '@shared/errors/AppError';
import slugfy from '@utils/slugfy';
import Book from '@shared/database/entities/Book';

interface IRequest {
	book_id: string;
	name: string;
	pages: number;
}

@injectable()
export default class UpdateBookService {
	constructor(
		@inject('BooksRepository')
		private booksRepository: BooksRepository,
	) {}
	public async execute({ book_id, name, pages }: IRequest): Promise<Book> {
		const book = await this.booksRepository.findById(book_id);

		if (!book) {
			throw new AppError('Book does not found', 404);
		}

		const slug = slugfy(name);

		const slugExists = await this.booksRepository.findBySlug(slug);

		if (slugExists) {
			throw new AppError(`Name ${name} is already used`, 400);
		}

		const newBookData = Object.assign(book, { name, pages, slug });

		const bookUpdated = await this.booksRepository.update(newBookData);

		return bookUpdated;
	}
}
