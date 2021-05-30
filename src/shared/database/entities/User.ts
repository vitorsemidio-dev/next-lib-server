import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';
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
	@Exclude()
	password: string;

	@Column()
	avatar: string;

	@OneToMany(() => RentBook, (bookRented) => bookRented.user)
	bookRented: RentBook[];

	@CreateDateColumn()
	created_at: Date = new Date();

	@UpdateDateColumn()
	updated_at: Date = new Date();

	@Expose({ name: 'imgUrl' })
	getImgUrl(): string | null {
		return this.avatar ? `http://localhost:3333/files/${this.avatar}` : null;
	}
}

export default User;
