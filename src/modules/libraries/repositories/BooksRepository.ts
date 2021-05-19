/** @format */

import { EntityRepository, Repository } from 'typeorm';

import Book from '@shared/database/entities/Book';

@EntityRepository(Book)
class BooksRepository extends Repository<Book> {
	public async findBySlug(slug: string): Promise<Book | undefined> {
		const book = await this.findOne({ where: { slug } });

		return book;
	}
}

export default BooksRepository;
