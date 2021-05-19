/** @format */

import { Request, Response } from 'express';

import CreateUserService from '../services/CreateUserService';
import UsersRepository from '../repositories/implementations/UsersRepository';

class UsersController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { name, email, password } = request.body;
		const { file } = request;
		const avatar = file.filename;

		const usersRepository = new UsersRepository();
		const createUserService = new CreateUserService(usersRepository);

		const user = await createUserService.execute({
			name,
			email,
			password,
			avatar,
		});

		return response.json(user);
	}

	public async list(request: Request, response: Response): Promise<Response> {
		const usersRepository = new UsersRepository();

		const users = await usersRepository.find();

		return response.json(users);
	}
}

export default UsersController;
