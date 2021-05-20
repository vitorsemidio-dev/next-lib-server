/** @format */

import { getRepository } from 'typeorm';
import { container } from 'tsyringe';

import StockLibraryRepository from '@modules/libraries/repositories/StockLibraryRepository';
import UsersRepository from '@modules/users/repositories/UsersRepository';

import StockLibrary from '@shared/database/entities/StockLibrary';
import RentBook from '@shared/database/entities/RentBook';

interface IRequest {
	user_id: string;
	stock_library_id: string;
}

export default class RentBookService {
	public async execute({
		user_id,
		stock_library_id,
	}: IRequest): Promise<RentBook> {
		const stockLibraryRepository = container.resolve(StockLibraryRepository);
		const usersRepository = container.resolve(UsersRepository);

		const rentBookRepository = getRepository(RentBook);

		const rentBook = rentBookRepository.create({
			user_id,
			stock_library_id,
		});

		await rentBookRepository.save(rentBook);

		return rentBook;
	}

	public async executeList() {
		const rentBookRepository = getRepository(RentBook);

		const booksRented = await rentBookRepository.find();

		return booksRented;
	}
}
