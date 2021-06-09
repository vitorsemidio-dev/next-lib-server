import { inject, injectable } from 'tsyringe';
import { getManager } from 'typeorm';

import IBooksRepository from '@modules/libraries/repositories/interfaces/IBooksRepository';
import IRentBooksRepository from '@modules/libraries/repositories/interfaces/IRentBooksRepository';
import IUsersRepository from '@modules/users/repositories/interfaces/IUsersRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
	user_id: string;
	book_id: string;
}
@injectable()
export default class UserRentBookService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
		@inject('BooksRepository')
		private booksRepository: IBooksRepository,
		@inject('RentBooksRepository')
		private rentBooksRepository: IRentBooksRepository,
	) {}

	public async execute({ user_id, book_id }: IRequest): Promise<any> {
		const [userExists, bookExists] = await Promise.all([
			this.usersRepository.findById(user_id),
			this.booksRepository.findByIdWithRelations(book_id),
		]);

		if (!userExists) {
			throw new AppError('User does not exists', 404);
		}

		if (!bookExists) {
			throw new AppError('Book does not exists', 404);
		}

		if (bookExists.stockLibrary.length === 0) {
			throw new AppError('Without book in stock', 400);
		}

		const stockItem = bookExists.stockLibrary[0];

		stockItem.quantity -= 1;

		const bookRented = this.rentBooksRepository.createInstance({
			user_id,
			stock_library_id: stockItem.id,
		});

		await getManager().transaction(async (transactionalEntityManager) => {
			await transactionalEntityManager.save(stockItem);
			await transactionalEntityManager.save(bookRented);
		});

		return {
			user_id,
			book_id,
		};
	}
}
