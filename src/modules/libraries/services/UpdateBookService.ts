import { inject, injectable } from 'tsyringe';
import { getManager } from 'typeorm';

import BooksRepository from '@modules/libraries/repositories/BooksRepository';

import AppError from '@shared/errors/AppError';
import slugfy from '@utils/slugfy';
import Book from '@shared/database/entities/Book';

interface IRequest {
	book_id: string;
	name: string;
	pages: number;
	author: string;
	quantity: number;
}

@injectable()
export default class UpdateBookService {
	constructor(
		@inject('BooksRepository')
		private booksRepository: BooksRepository,
	) {}
	public async execute({
		book_id,
		name,
		pages,
		author,
		quantity,
	}: IRequest): Promise<Book> {
		const book = await this.booksRepository.findById(book_id, ['stockLibrary']);

		if (!book) {
			throw new AppError('Book does not found', 404);
		}

		const slug = slugfy(name);

		const slugExists = await this.booksRepository.findBySlug(slug);

		if (slugExists && slugExists.id !== book_id) {
			throw new AppError(`Name ${name} is already used`, 400);
		}

		if (quantity && quantity < 0) {
			throw new AppError(`Quantity must be greater than 0`, 400);
		}

		const newBookData = Object.assign(book, { name, pages, slug, author });
		const stockItem = book.stockLibrary[0];

		if (quantity !== stockItem.quantity) {
			stockItem.quantity = quantity;
			await getManager().transaction(async (transactionalEntityManager) => {
				await transactionalEntityManager.save(newBookData);
				await transactionalEntityManager.save(stockItem);
			});

			return newBookData;
		}

		const bookUpdated = await this.booksRepository.update(newBookData);

		return bookUpdated;
	}
}
