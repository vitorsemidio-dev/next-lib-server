import fs from 'fs';
import path from 'path';
import { inject, injectable } from 'tsyringe';

import IBooksRepository from '@modules/libraries/repositories/interfaces/IBooksRepository';
import uploadConfig from '@shared/config/upload';
import AppError from '@shared/errors/AppError';

interface IRequest {
	book_id: string;
	filename: string;
}

@injectable()
export default class UpdateImageBookService {
	constructor(
		@inject('BooksRepository')
		private booksRepository: IBooksRepository,
	) {}

	public async execute({ book_id, filename }: IRequest) {
		const book = await this.booksRepository.findById(book_id);

		if (!book) {
			throw new AppError('Book does not found', 404);
		}

		if (book.picture) {
			await this.deleteImageFile(book.picture);
		}

		book.picture = filename;

		const bookUpdated = await this.booksRepository.update(book);

		return bookUpdated;
	}

	private async deleteImageFile(filename: string) {
		const filePath = path.resolve(uploadConfig.destination, filename);

		try {
			await fs.promises.stat(filePath);
		} catch (err) {
			return;
		}

		await fs.promises.unlink(filePath);
	}
}
