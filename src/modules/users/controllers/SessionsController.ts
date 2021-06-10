import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthService from '../services/AuthService';

export default class SessionsController {
	public async create(request: Request, response: Response) {
		const { email, password } = request.body;

		const authService = container.resolve(AuthService);

		const { user, token } = await authService.execute({
			email,
			password,
		});

		return response.json({
			user: classToClass(user),
			token,
		});
	}
}
