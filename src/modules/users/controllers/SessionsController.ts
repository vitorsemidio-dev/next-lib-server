/** @format */

import { Request, Response } from 'express';

import AuthService from '../services/AuthService';

let authService: AuthService;

export default class SessionsController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { email, password } = request.body;

		authService = new AuthService();

		const { user, token } = await authService.execute({
			email,
			password,
		});

		return response.json({
			user,
			token,
		});
	}
}
