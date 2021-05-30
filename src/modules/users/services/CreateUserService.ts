import { inject, injectable } from 'tsyringe';

import User from '@shared/database/entities/User';
import AppError from '@shared/errors/AppError';
import HashProvider from '@utils/HashProvider';

import IUsersRepository from '../repositories/interfaces/IUsersRepository';

interface IRequest {
	name: string;
	email: string;
	password: string;
	avatar?: string;
}

type IResponse = User;

@injectable()
class CreateUserService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
	) {}

	public async execute({
		name,
		email,
		password,
		avatar,
	}: IRequest): Promise<IResponse> {
		const userCheck = await this.usersRepository.findByEmail(email);

		if (userCheck) throw new AppError('Email is already used', 400);

		const passwordHashed = await HashProvider.generateHash(password);

		const user = await this.usersRepository.create({
			name,
			email,
			password: passwordHashed,
			avatar,
		});

		return user;
	}
}

export default CreateUserService;
