/** @format */

import { getCustomRepository } from 'typeorm';

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

export default class CreateBookService {
	private repository: BooksRepository;

	constructor() {
		this.repository = getCustomRepository(BooksRepository);
	}
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

		const book = this.repository.create({
			name,
			slug,
			author,
			pages,
			picture,
		});

		await this.repository.save(book);

		return book;
	}
}
