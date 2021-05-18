/** @format */

import { getCustomRepository } from 'typeorm';

import LibrariesRepository from '../repositories/LibrariesRepository';
import BooksRepository from '../repositories/BooksRepository';
import AppError from '../errors/AppError';

interface IRequest {
	library_id: string;
	book_id: string;
}

export default class AddBookToLibraryService {
	private librariesRepository: LibrariesRepository;
	private booksRepository: BooksRepository;

	constructor() {
		this.librariesRepository = getCustomRepository(LibrariesRepository);
		this.booksRepository = getCustomRepository(BooksRepository);
	}

	public async execute({ library_id, book_id }: IRequest): Promise<void> {
		const bookCheck = await this.booksRepository.findOne(book_id);

		if (!bookCheck) throw new AppError('Book does not exist', 404);

		const libraryCheck = await this.librariesRepository.findOne(library_id);

		if (!libraryCheck) throw new AppError('Library does not exist', 404);

		libraryCheck.books.push(bookCheck);

		await this.librariesRepository.save(libraryCheck);

		return;
	}
}
