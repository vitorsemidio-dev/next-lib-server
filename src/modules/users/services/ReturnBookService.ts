import { inject, injectable } from 'tsyringe';

import IRentBooksRepository from '@modules/libraries/repositories/interfaces/IRentBooksRepository';
import IStockLibraryRepository from '@modules/libraries/repositories/interfaces/IStockLibraryRepository';
import IUsersRepository from '../repositories/interfaces/IUsersRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
	user_id: string;
	book_id: string;
}

@injectable()
export default class ReturnBookService {
	constructor(
		@inject('UserRepository')
		private usersRepository: IUsersRepository,
		@inject('RentBooksRepository')
		private rentBookRepository: IRentBooksRepository,
		@inject('StockLibraryRepository')
		private stockLibraryRepository: IStockLibraryRepository,
	) {}
	public async execute({ user_id, book_id }: IRequest) {
		const user = await this.usersRepository.findById(user_id);

		if (!user) {
			throw new AppError('User does not found', 404);
		}

		const booksRented = await this.rentBookRepository.findByUserId(user_id);

		const bookRented = booksRented.find((item) => item.book.id === book_id);

		// bookRented.status = 'Devolvido'

		return true;
	}
}
