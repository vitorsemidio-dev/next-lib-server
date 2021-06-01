import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import ListBooksRentedService from '../services/ListBooksRentedService';

export default class BooksRentedController {
	public async list(request: Request, response: Response) {
		const { user_id } = request.params;
		const listBooksRentedService = new ListBooksRentedService();

		const booksRented = await listBooksRentedService.execute({
			user_id,
		});

		return response.json(classToClass(booksRented));
	}
}
