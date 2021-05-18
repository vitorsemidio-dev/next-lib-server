/** @format */

import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	UpdateDateColumn,
	CreateDateColumn,
	OneToMany,
	JoinColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import Book from './Book';

@Entity('libraries')
class Library {
	@PrimaryGeneratedColumn('uuid')
	id: string = uuid();

	@Column()
	name: string;

	@Column()
	slug: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@Column()
	avatar: string;

	@OneToMany(() => Book, (book) => book.library, {
		eager: true,
	})
	@JoinColumn({ name: 'library_id' })
	books: Book;

	@CreateDateColumn()
	created_at: Date = new Date();

	@UpdateDateColumn()
	updated_at: Date = new Date();
}

export default Library;
