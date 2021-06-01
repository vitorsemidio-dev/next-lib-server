import ICreateBookDTO from '@modules/libraries/dtos/ICreateBookDTO';
import Book from '@shared/database/entities/Book';

export default interface IBooksRepository {
	findBySlug(slug: string): Promise<Book | undefined>;
	find(): Promise<Book[]>;
	create(data: ICreateBookDTO): Promise<Book>;
	findById(id: string): Promise<Book | undefined>;
	remove(id: string): Promise<void>;
	update(book: Book): Promise<Book>;
	findByIdWithRelations(id: string): Promise<Book | undefined>;
}
