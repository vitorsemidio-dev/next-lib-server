/** @format */

import { Request, Response } from 'express';

import { getCustomRepository } from 'typeorm';

import CreateBookService from '../services/CreateBookService';

import BooksRepository from '../repositories/BooksRepository';

let booksRepository: BooksRepository;
let createBookService: CreateBookService;

export default class BooksController {
	public async index(requet: Request, response: Response): Promise<Response> {
		booksRepository = getCustomRepository(BooksRepository);

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
