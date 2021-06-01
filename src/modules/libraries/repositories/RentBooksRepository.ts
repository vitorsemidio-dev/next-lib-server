import { getRepository, Repository } from 'typeorm';

import RentBook from '@shared/database/entities/RentBook';
import IRentBooksRepository from './interfaces/IRentBooksRepository';

export class RentBooksRepository implements IRentBooksRepository {
	private ormRepository: Repository<RentBook>;

	constructor() {
		this.ormRepository = getRepository(RentBook);
	}
	public async create(data: any) {
		console.log(data);
	}
}
