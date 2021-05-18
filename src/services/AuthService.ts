/** @format */

import { getCustomRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';

import User from '../database/entities/User';
import env from '../environment/env.js';

import UsersRepository from '../repositories/UsersRepository';
import HashProvider from '../utils/HashProvider';

interface IRequest {
	email: string;
	password: string;
}

interface IResponse {
	user: User;
	token: string;
}

export default class AuthService {
	private repository: UsersRepository;

	constructor() {
		this.repository = getCustomRepository(UsersRepository);
	}

	public async execute({ email, password }: IRequest): Promise<IResponse> {
		const user = await this.repository.findByEmail(email);

		if (!user) throw new Error('Email and password does not match');

		const isPasswordValid = await HashProvider.compareHash(
			password,
			user.password,
		);

		if (!isPasswordValid) throw new Error('Email and password does not match');

		const token = sign({}, env.jwtSecret, {
			expiresIn: env.jwtExpiresIn,
			subject: user.id,
		});

		return {
			user,
			token,
		};
	}
}
