/** @format */

import { Request, Response } from 'express';
import AppError from '../errors/AppError';

import AuthService from '../services/AuthService';

let authService: AuthService;

export default class SessionsController {
	public async create(request: Request, response: Response): Promise<Response> {
		try {
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
		} catch (error) {
			const { statusCode, message } = error as AppError;
			return response.status(statusCode).send({
				error: message,
			});
		}
	}
}
