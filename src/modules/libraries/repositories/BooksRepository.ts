/** @format */

import { getRepository, Repository } from 'typeorm';

import Book from '@shared/database/entities/Book';

import IBooksRepository from './interfaces/IBooksRepository';
import ICreateBookDTO from '@modules/libraries/dtos/ICreateBookDTO';

class BooksRepository implements IBooksRepository {
	private ormRepository: Repository<Book>;

	constructor() {
		this.ormRepository = getRepository(Book);
	}
	public async findBySlug(slug: string): Promise<Book | undefined> {
		const book = await this.ormRepository.findOne({ where: { slug } });

		return book;
	}

	public async find(): Promise<Book[]> {
		const books = await this.ormRepository.find();

		return books;
	}

	public async create(bookData: ICreateBookDTO): Promise<Book> {
		const book = this.ormRepository.create(bookData);
		await this.ormRepository.save(book);

		return book;
	}

	public async findById(id: string): Promise<Book | undefined> {
		const book = await this.ormRepository.findOne(id);

		return book;
	}
}

export default BooksRepository;
