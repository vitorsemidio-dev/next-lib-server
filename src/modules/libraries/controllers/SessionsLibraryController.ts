import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import LibraryAuthenticateService from '../services/LibraryAuthenticateService';
import LibrariesRepository from '../repositories/LibrariesRepository';

export default class SessionsLibraryController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { email, password } = request.body;

		const librariesRepository = container.resolve(LibrariesRepository);
		const libraryAuthenticateService = new LibraryAuthenticateService(
			librariesRepository,
		);

		const { library, token } = await libraryAuthenticateService.execute({
			email,
			password: String(password),
		});

		return response.json({
			library: classToClass(library),
			token,
		});
	}
}
