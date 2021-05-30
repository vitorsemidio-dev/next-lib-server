import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { v4 as uuid } from 'uuid';

import StockLibrary from './StockLibrary';

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

	@OneToMany(() => StockLibrary, (stockLibrary) => stockLibrary.book)
	public stockLibrary!: StockLibrary[];

	@CreateDateColumn()
	created_at: Date = new Date();

	@UpdateDateColumn()
	updated_at: Date = new Date();

	@Expose({ name: 'imgUrl' })
	getImgUrl(): string | null {
		return this.picture ? `http://localhost:3333/files/${this.picture}` : null;
	}
}

export default Book;
