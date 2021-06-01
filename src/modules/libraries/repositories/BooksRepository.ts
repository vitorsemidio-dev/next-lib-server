import { getRepository, In, Repository } from 'typeorm';

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

	public async findBooksByIds(ids: string[]): Promise<Book[]> {
		const books = await this.ormRepository.find({
			where: {
				id: In(ids),
			},
		});

		return books || [];
	}

	public async findByIdWithRelations(id: string) {
		const book = await this.ormRepository.findOne(id, {
			relations: [],
		});

		return book;
	}

	public async remove(id: string): Promise<void> {
		await this.ormRepository.delete(id);
	}

	public async update(book: Book): Promise<any> {
		const bookUpdated = await this.ormRepository.save(book);

		return bookUpdated;
	}
}

export default BooksRepository;
