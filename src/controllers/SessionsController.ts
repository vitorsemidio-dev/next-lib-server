/** @format */

import { Request, Response } from 'express';

import AuthService from '../services/AuthService';

let authService: AuthService;

export default class SessionsController {
	public async create(request: Request, response: Response): Promise<Response> {
		try {
			const { email, password } = request.body;

			authService = new AuthService();

			const isValidCredentials = await authService.execute({
				email,
				password,
			});

			return response.json(isValidCredentials);
		} catch (error) {
			return response.status(400).send({
				errorMessage: error.message,
			});
		}
	}
}
