/** @format */

import { getCustomRepository } from 'typeorm';

import User from '@shared/database/entities/User';
import AppError from '@shared/errors/AppError';
import UsersRepository from '../repositories/UsersRepository';

import HashProvider from '@utils/HashProvider';

interface IRequest {
	name: string;
	email: string;
	password: string;
	avatar?: string;
}

type IResponse = User;

class CreateUserService {
	private repository: UsersRepository;

	constructor() {
		this.repository = getCustomRepository(UsersRepository);
	}

	public async execute({
		name,
		email,
		password,
		avatar,
	}: IRequest): Promise<IResponse> {
		const userCheck = await this.repository.findByEmail(email);

		if (userCheck) throw new AppError('Email is already used', 400);

		const passwordHashed = await HashProvider.generateHash(password);

		const user = await this.repository.create({
			name,
			email,
			password: passwordHashed,
			avatar,
		});

		return user;
	}
}

export default CreateUserService;
