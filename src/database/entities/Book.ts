/** @format */

import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import Library from './Library';

@Entity('books')
class Book {
	@PrimaryGeneratedColumn('uuid')
	id: string = uuid();

	@Column()
	name: string;

	@Column()
	slug: string;

	@Column()
	author: string;

	@Column()
	pages: number;

	@Column()
	picture: string;

	@ManyToOne(() => Library, (library) => library.books)
	@JoinColumn({ name: 'library_id' })
	library: Library;

	@CreateDateColumn()
	created_at: Date = new Date();

	@UpdateDateColumn()
	updated_at: Date = new Date();
}

export default Book;
