/** @format */

import { inject, injectable } from 'tsyringe';

import slugfy from '@utils/slugfy';
import Book from '@shared/database/entities/Book';
import BooksRepository from '../repositories/BooksRepository';
import AppError from '@shared/errors/AppError';

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
		private repository: BooksRepository,
	) {}
	public async execute({
		name,
		author,
		pages,
		picture,
	}: IRequest): Promise<Book> {
		const slug = slugfy(name);

		const checkBook = await this.repository.findBySlug(slug);

		if (checkBook)
			throw new AppError(`The book ${name} is already registered`, 400);

		const book = await this.repository.create({
			name,
			slug,
			author,
			pages,
			picture,
		});

		return book;
	}
}
