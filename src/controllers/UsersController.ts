/** @format */

import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import CreateUserService from '../services/CreateUserService';
import UsersRepository from '../repositories/UsersRepository';

let createUserService: CreateUserService;
let usersRepository: UsersRepository;

class UsersController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { name, email, password, avatar_url } = request.body;
		createUserService = new CreateUserService();

		const user = await createUserService.execute({
			name,
			email,
			password,
			avatar_url,
		});

		return response.json(user);
	}

	public async list(request: Request, response: Response): Promise<Response> {
		usersRepository = getCustomRepository(UsersRepository);

		const users = await usersRepository.find();

		return response.json(users);
	}
}

export default UsersController;
