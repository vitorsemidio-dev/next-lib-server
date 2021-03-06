import { getRepository, In, Repository } from 'typeorm';

import ICreateBookDTO from '@modules/libraries/dtos/ICreateBookDTO';
import Book from '@shared/database/entities/Book';
import slugfy from '@utils/slugfy';

import IBooksRepository from './interfaces/IBooksRepository';
import INameAvailabilityRepository from './interfaces/INameAvailabilityRepository';

class BooksRepository implements IBooksRepository, INameAvailabilityRepository {
	private ormRepository: Repository<Book>;

	constructor() {
		this.ormRepository = getRepository(Book);
	}
	public async findBySlug(slug: string): Promise<Book | undefined> {
		const book = await this.ormRepository.findOne({
			where: { slug },
			relations: ['stockLibrary'],
		});

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

	public async findById(
		id: string,
		relations?: string[],
	): Promise<Book | undefined> {
		const book = await this.ormRepository.findOne(id, {
			relations,
		});

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
			relations: ['stockLibrary'],
		});

		return book;
	}

	public async remove(id: string): Promise<void> {
		await this.ormRepository.delete(id);
	}

	public async update(book: Book): Promise<Book> {
		const bookUpdated = await this.ormRepository.save(book);

		return bookUpdated;
	}

	public async checkNameAvailability(name: string) {
		const slug = slugfy(name);
		const isNameUsed = await this.findBySlug(slug);

		if (isNameUsed) {
			return false;
		}

		return true;
	}
}

export default BooksRepository;
