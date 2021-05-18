/** @format */

import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import CreateUserService from '../services/CreateUserService';
import UsersRepository from '../repositories/UsersRepository';
import AppError from '../errors/AppError';

let createUserService: CreateUserService;
let usersRepository: UsersRepository;

class UsersController {
	public async create(request: Request, response: Response): Promise<Response> {
		try {
			const { name, email, password } = request.body;
			const { file } = request;
			const avatar = file.filename;

			createUserService = new CreateUserService();

			const user = await createUserService.execute({
				name,
				email,
				password,
				avatar,
			});

			return response.json(user);
		} catch (error) {
			const { message, statusCode } = error as AppError;
			return response.status(statusCode).json({
				error: message,
			});
		}
	}

	public async list(request: Request, response: Response): Promise<Response> {
		usersRepository = getCustomRepository(UsersRepository);

		const users = await usersRepository.find();

		return response.json(users);
	}
}

export default UsersController;
