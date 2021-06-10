import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import User from '@shared/database/entities/User';
import AppError from '@shared/errors/AppError';
import env from '@shared/environment/env.js';

import HashProvider from '@utils/HashProvider';
import IUsersRepository from '../repositories/interfaces/IUsersRepository';

interface IRequest {
	email: string;
	password: string;
}

interface IResponse {
	user: User;
	token: string;
}

@injectable()
export default class AuthService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
	) {}

	public async execute({ email, password }: IRequest): Promise<IResponse> {
		const user = await this.usersRepository.findByEmail(email);

		if (!user) throw new AppError('Email and password does not match', 401);

		const isPasswordValid = await HashProvider.compareHash(
			password,
			user.password,
		);

		if (!isPasswordValid)
			throw new AppError('Email and password does not match', 401);

		const token = sign({}, env.jwtSecretUser, {
			expiresIn: env.jwtExpiresIn,
			subject: user.id,
		});

		return {
			user,
			token,
		};
	}
}
