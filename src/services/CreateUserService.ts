/** @format */

import { getCustomRepository } from 'typeorm';

import User from '../database/entities/User';
import AppError from '../errors/AppError';
import UsersRepository from '../repositories/UsersRepository';

import HashProvider from '../utils/HashProvider';

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
		const userCheck = await this.repository.findOne({
			where: { email },
		});

		if (userCheck) throw new AppError('Email is already used', 400);

		const passwordHashed = await HashProvider.generateHash(password);

		const user = this.repository.create({
			name,
			email,
			password: passwordHashed,
			avatar: avatar || '',
		});

		await this.repository.save(user);

		return user;
	}
}

export default CreateUserService;
