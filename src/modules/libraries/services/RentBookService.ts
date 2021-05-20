/** @format */

import { getManager, getRepository } from 'typeorm';
import { container } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import StockLibraryRepository from '@modules/libraries/repositories/StockLibraryRepository';
import UsersRepository from '@modules/users/repositories/UsersRepository';
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

		const userExists = usersRepository.findById(user_id);

		if (!userExists) throw new AppError('User does not exists', 400);

		const stockExists = await stockLibraryRepository.findById(stock_library_id);

		if (!stockExists) throw new AppError('Stock does not exists', 400);

		const rentBook = rentBookRepository.create({
			user_id,
			stock_library_id,
		});

		stockExists.quantity = stockExists.quantity - 1;

		await getManager().transaction(async (transactionalEntityManager) => {
			await transactionalEntityManager.save(stockExists);
			await transactionalEntityManager.save(rentBook);
		});

		return rentBook;
	}

	public async executeList() {
		const rentBookRepository = getRepository(RentBook);

		const booksRented = await rentBookRepository.find();

		return booksRented;
	}
}
