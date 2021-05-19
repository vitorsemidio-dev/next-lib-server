/** @format */

import { Request, Response } from 'express';

import LibraryAuthenticateService from '../services/LibraryAuthenticateService';

let libraryAuthenticateService: LibraryAuthenticateService;

export default class SessionsLibraryController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { email, password } = request.body;
		libraryAuthenticateService = new LibraryAuthenticateService();

		const { library, token } = await libraryAuthenticateService.execute({
			email,
			password: String(password),
		});

		return response.json({
			library,
			token,
		});
	}
}
