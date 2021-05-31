import fs from 'fs';
import path from 'path';
import { inject, injectable } from 'tsyringe';

import uploadConfig from '@shared/config/upload';
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
			await this.deleteImageFile(book.picture);
		}

		book.picture = filename;

		const bookUpdated = await this.repository.update(book);

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
