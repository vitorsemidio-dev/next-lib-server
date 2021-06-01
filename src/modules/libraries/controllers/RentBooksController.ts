import { Request, Response } from 'express';

import UserRentBookService from '../services/UserRentBookService';

export default class RentBooksController {
	public async create(request: Request, response: Response) {
		const { user_id, library_id, book_id } = request.body;

		// const bookRented = { user_id, library_id, book_id };
		const rentBookService = new UserRentBookService();

		const bookRented = await rentBookService.execute({
			user_id,
			book_id,
		});

		return response.json(bookRented);
		return response.json();
	}
}
