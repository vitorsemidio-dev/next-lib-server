import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import BooksRepository from '../repositories/BooksRepository';

interface IRequest {
	book_id: string;
	filename: string;
}

@injectable()
export default class UpdateImageBookService {
	constructor(
		@inject('BooksRepository')
		private repository: BooksRepository,
	) {}

	public async execute({ book_id, filename }: IRequest) {
		const book = await this.repository.findById(book_id);

		if (!book) {
			throw new AppError('Book does not found', 404);
		}

		if (book.picture) {
			// TODO: Remover arquivo existente
		}

		book.picture = filename;

		const bookUpdated = await this.repository.update(book);

		return bookUpdated;
	}
}
