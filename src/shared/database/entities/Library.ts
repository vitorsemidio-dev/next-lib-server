import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	UpdateDateColumn,
	CreateDateColumn,
	OneToMany,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
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
	@Exclude()
	password: string;

	@Column()
	avatar: string;

	@OneToMany(() => StockLibrary, (stockLibrary) => stockLibrary.library, {
		eager: false,
	})
	stockLibrary!: StockLibrary[];

	@CreateDateColumn()
	created_at: Date = new Date();

	@UpdateDateColumn()
	updated_at: Date = new Date();

	@Expose({ name: 'imgUrl' })
	getImgUrl(): string | null {
		return this.avatar ? `http://localhost:3333/files/${this.avatar}` : null;
	}
}

export default Library;
