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
	public async createInstance(rentBookData: IRequest) {
		const bookRented = this.ormRepository.create(rentBookData);

		return bookRented;
	}
}
