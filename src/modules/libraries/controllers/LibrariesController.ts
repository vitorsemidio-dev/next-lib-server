/** @format */

import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import CreateLibraryService from '../services/CreateLibraryService';
import LibrariesRepository from '../repositories/LibrariesRepository';

let createLibraryService: CreateLibraryService;
let librariesRepository: LibrariesRepository;

export default class LibrariesController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { name, email, password } = request.body;
		const { filename: avatar } = request.file;

		createLibraryService = new CreateLibraryService();

		const library = await createLibraryService.execute({
			name,
			email,
			password,
			avatar,
		});

		return response.json(library);
	}

	public async list(request: Request, response: Response): Promise<Response> {
		librariesRepository = getCustomRepository(LibrariesRepository);

		const libraries = await librariesRepository.find();

		return response.json(libraries);
	}
}
