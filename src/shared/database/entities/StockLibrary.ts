import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';

import Library from './Library';
import Book from './Book';

@Entity('stock_library')
class StockLibrary {
	@PrimaryGeneratedColumn('uuid')
	id: string = uuid();

	@Column('int')
	quantity: number;

	@Column()
	book_id: string;

	@ManyToOne(() => Book, (book) => book.stockLibrary, {
		eager: false,
	})
	@JoinColumn({
		name: 'book_id',
	})
	book: Book;

	@Column()
	library_id: string;

	@ManyToOne(() => Library, (library) => library.stockLibrary, {
		eager: false,
	})
	@JoinColumn({
		name: 'library_id',
	})
	library: Library;

	@CreateDateColumn()
	created_at: Date = new Date();

	@UpdateDateColumn()
	updated_at: Date = new Date();
}

export default StockLibrary;
