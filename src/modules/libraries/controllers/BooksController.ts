/** @format */

import { Request, Response } from 'express';

import CreateBookService from '../services/CreateBookService';

import BooksRepository from '../repositories/implementations/BooksRepository';

let createBookService: CreateBookService;

export default class BooksController {
	public async list(requet: Request, response: Response): Promise<Response> {
		const booksRepository = new BooksRepository();

		const books = await booksRepository.find();

		return response.json(books);
	}

	public async create(request: Request, response: Response): Promise<Response> {
		const { name, author, pages } = request.body;
		const { filename: picture } = request.file;
		createBookService = new CreateBookService();

		const book = await createBookService.execute({
			name,
			author,
			pages,
			picture,
		});

		return response.json(book);
	}
}
