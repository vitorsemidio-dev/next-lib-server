import { getRepository, Repository } from 'typeorm';

import RentBook from '@shared/database/entities/RentBook';
import IRentBooksRepository from './interfaces/IRentBooksRepository';

interface IRequest {
	user_id: string;
	stock_library_id: string;
}

export default class RentBooksRepository implements IRentBooksRepository {
	private ormRepository: Repository<RentBook>;

	constructor() {
		this.ormRepository = getRepository(RentBook);
	}
	public createInstance(rentBookData: IRequest) {
		const bookRented = this.ormRepository.create(rentBookData);

		return bookRented;
	}

	public async findByUserId(user_id: string) {
		const booksRented = await this.ormRepository.find({
			where: {
				user_id,
			},
		});

		return booksRented;
	}

	public async delete(id: string) {
		this.ormRepository.delete(id);
	}
}
