import { inject, injectable } from 'tsyringe';

import IBooksRepository from '@modules/libraries/repositories/interfaces/IBooksRepository';
import Book from '@shared/database/entities/Book';
import AppError from '@shared/errors/AppError';
import slugfy from '@utils/slugfy';

interface IRequest {
	name: string;
	author: string;
	pages: number;
	picture: string;
}

@injectable()
export default class CreateBookService {
	constructor(
		@inject('BooksRepository')
		private booksRepository: IBooksRepository,
	) {}
	public async execute({
		name,
		author,
		pages,
		picture,
	}: IRequest): Promise<Book> {
		const slug = slugfy(name);

		const checkBook = await this.booksRepository.findBySlug(slug);

		if (checkBook)
			throw new AppError(`The book ${name} is already registered`, 400);

		const book = await this.booksRepository.create({
			name,
			slug,
			author,
			pages,
			picture: picture || '',
		});

		return book;
	}
}
