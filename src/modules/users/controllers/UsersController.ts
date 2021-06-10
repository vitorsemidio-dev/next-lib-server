import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UsersRepository from '@modules/users/repositories/UsersRepository';
import CreateUserService from '../services/CreateUserService';
import CheckEmailAvailabilityService from '../services/CheckEmailAvailabilityService';
import UpdateUserService from '../services/UpdateUserService';
import UpdateUserImageService from '../services/UpdateUserImageService';

class UsersController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { name, email, password } = request.body;
		const avatar = request.file ? request.file.filename : '';

		const createUserService = container.resolve(CreateUserService);

		const user = await createUserService.execute({
			name,
			email,
			password,
			avatar,
		});

		const userViewModel = classToClass(user);

		return response.json(userViewModel);
	}

	public async list(request: Request, response: Response): Promise<Response> {
		const usersRepository = new UsersRepository();

		const users = await usersRepository.find();

		const usersViewModel = classToClass(users);

		return response.json(usersViewModel);
	}

	public async show(request: Request, response: Response): Promise<Response> {
		const { user_id } = request.body;
		const usersRepository = new UsersRepository();

		const user = await usersRepository.userDetail(user_id);

		const userViewModel = classToClass(user);

		return response.json(userViewModel);
	}

	public async update(request: Request, response: Response) {
		const { user_id } = request.params;
		const { name, email, password } = request.body;

		const usersRepository = container.resolve(UsersRepository);
		const updateUserService = new UpdateUserService(usersRepository);

		const userUpdated = await updateUserService.execute({
			id: user_id,
			email,
			name,
			password,
		});

		const userUpdatedViewModel = classToClass(userUpdated);

		return response.json(userUpdatedViewModel);
	}

	public async updateImage(request: Request, response: Response) {
		const { user_id } = request.params;
		const avatar = request.file ? request.file.filename : '';

		const usersRepository = container.resolve(UsersRepository);
		const updateUserImagemService = new UpdateUserImageService(usersRepository);

		const userUpdated = await updateUserImagemService.execute({
			filename: avatar,
			user_id,
		});

		const userUpdatedViewModel = classToClass(userUpdated);

		return response.json(userUpdatedViewModel);
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
