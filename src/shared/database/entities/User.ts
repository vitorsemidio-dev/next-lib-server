/** @format */

import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
} from 'typeorm';

import { v4 as uuid } from 'uuid';
import RentBook from './RentBook';

@Entity('users')
class User {
	@PrimaryGeneratedColumn('uuid')
	id: string = uuid();

	@Column()
	name: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@Column()
	avatar: string;

	@OneToMany(() => RentBook, (bookRented) => bookRented.user)
	bookRented: RentBook[];

	@CreateDateColumn()
	created_at: Date = new Date();

	@UpdateDateColumn()
	updated_at: Date = new Date();
}

export default User;
