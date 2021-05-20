/** @format */

import {
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	JoinColumn,
	ManyToOne,
	Column,
} from 'typeorm';

import { v4 as uuid } from 'uuid';

import Book from '@shared/database/entities/Book';
import Library from '@shared/database/entities/Library';
import StockLibrary from 'shared/database/entities/StockLibrary';
import User from '@shared/database/entities/User';

@Entity('rent_books')
class RentBook {
	@PrimaryGeneratedColumn('uuid')
	id: string = uuid();

	@Column()
	user_id: string;

	@Column()
	stock_library_id: string;

	@ManyToOne(() => User, (user) => user.bookRented, {
		eager: true,
	})
	@JoinColumn({
		name: 'user_id',
	})
	user: User;

	@ManyToOne(() => StockLibrary, (stockLibrary) => stockLibrary.book)
	@JoinColumn({
		name: 'stock_library_id',
	})
	book: Book;

	@ManyToOne(() => StockLibrary, (stockLibrary) => stockLibrary.library, {
		eager: true,
	})
	@JoinColumn({
		name: 'stock_library_id',
	})
	library: Library;

	@CreateDateColumn({
		default: new Date(),
	})
	created_at: Date;

	@UpdateDateColumn({
		default: new Date(),
	})
	updated_at: Date;
}

export default RentBook;
