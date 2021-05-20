/** @format */

import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Book from '@shared/database/entities/Book';
import Library from '@shared/database/entities/Library';
import User from '@shared/database/entities/User';

import userFactory from './fakes/userFactory';
import libraryFactory from './fakes/libraryFactory';
import bookFactory from './fakes/bookFactory';

class AdminController {
	public async createBooks(request: Request, response: Response) {
		const quantity = Number(request.body.quantity || 10);

		const booksRepository = getRepository(Book);

		const books = bookFactory(quantity);

		const booksCreated = booksRepository.create(books);

		await booksRepository.save(booksCreated);

		return response.json(booksCreated);
	}

	public async createLibraries(request: Request, response: Response) {
		const quantity = Number(request.body.quantity || 10);

		const librariesRepository = getRepository(Library);

		const libraries = await libraryFactory(quantity);

		const librariesCreated = librariesRepository.create(libraries);

		await librariesRepository.save(librariesCreated);

		return response.json(librariesCreated);
	}

	public async createUsers(request: Request, response: Response) {
		const quantity = Number(request.body.quantity || 10);

		const usersRepository = getRepository(User);

		const users = await userFactory(quantity);

		const usersCreated = usersRepository.create(users);

		await usersRepository.save(usersCreated);

		return response.json(usersCreated);
	}
}

export default new AdminController();
