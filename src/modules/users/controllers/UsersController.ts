import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UsersRepository from '../repositories/UsersRepository';
import CreateUserService from '../services/CreateUserService';
import CheckEmailAvailabilityService from '../services/CheckEmailAvailabilityService';

class UsersController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { name, email, password } = request.body;
		const { file } = request;
		const avatar = file.filename;

		const createUserService = container.resolve(CreateUserService);

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

	public async detail(request: Request, response: Response): Promise<Response> {
		const { user_id } = request.body;
		const usersRepository = new UsersRepository();

		const user = await usersRepository.userDetail(user_id);

		return response.json(user);
	}

	public async update(request: Request, response: Response) {
		return response.json();
	}

	public async updateImage(request: Request, response: Response) {
		const avatar = request.file ? request.file.filename : '';
		return response.json();
	}

	public async checkEmailAvailability(request: Request, response: Response) {
		const { email } = request.body;

		const usersRepository = container.resolve(UsersRepository);

		const checkEmailAvailabilityService = new CheckEmailAvailabilityService(
			usersRepository,
		);

		const isEmailAvailable = await checkEmailAvailabilityService.execute(email);

		return response.json({
			available: isEmailAvailable,
			email,
		});
	}
}

export default UsersController;
