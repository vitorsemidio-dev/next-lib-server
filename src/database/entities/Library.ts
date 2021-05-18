/** @format */

import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	UpdateDateColumn,
	CreateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

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

	@CreateDateColumn()
	created_at: Date = new Date();

	@UpdateDateColumn()
	updated_at: Date = new Date();
}

export default Library;
