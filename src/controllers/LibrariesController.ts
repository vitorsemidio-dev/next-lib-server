/** @format */

import { Request, Response } from 'express';

import CreateLibraryService from '../services/CreateLibraryService';

let createLibraryService: CreateLibraryService;

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
}
