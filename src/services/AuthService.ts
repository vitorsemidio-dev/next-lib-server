/** @format */

import { getCustomRepository } from 'typeorm';

import UsersRepository from '../repositories/UsersRepository';
import HashProvider from '../utils/HashProvider';

interface IRequest {
	email: string;
	password: string;
}

export default class AuthService {
	private repository: UsersRepository;

	constructor() {
		this.repository = getCustomRepository(UsersRepository);
	}

	public async execute({ email, password }: IRequest): Promise<boolean> {
		const user = await this.repository.findByEmail(email);

		if (!user) throw new Error('Email and password does not match');

		const isPasswordValid = await HashProvider.compareHash(
			password,
			user.password,
		);

		if (!isPasswordValid) throw new Error('Email and password does not match');

		return true;
	}
}
