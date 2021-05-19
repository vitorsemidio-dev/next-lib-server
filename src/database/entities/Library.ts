/** @format */

import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	UpdateDateColumn,
	CreateDateColumn,
	OneToMany,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import StockLibrary from './StockLibrary';

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

	@OneToMany(() => StockLibrary, (stockLibrary) => stockLibrary.library, {
		eager: true,
	})
	stockLibrary!: StockLibrary[];

	@CreateDateColumn()
	created_at: Date = new Date();

	@UpdateDateColumn()
	updated_at: Date = new Date();
}

export default Library;
