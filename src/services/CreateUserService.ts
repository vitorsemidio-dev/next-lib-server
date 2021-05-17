/** @format */

import { getCustomRepository } from 'typeorm';

import User from '../database/entities/User';
import UsersRepository from '../repositories/UsersRepository';

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
		const user = this.repository.create({
			name,
			email,
			password,
			avatar: avatar || '',
		});

		await this.repository.save(user);

		return user;
	}
}

export default CreateUserService;
