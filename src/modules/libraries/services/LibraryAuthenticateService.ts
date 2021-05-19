/** @format */

import { getCustomRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';

import Library from '@shared/database/entities/Library';
import AppError from '@shared/errors/AppError';
import env from '@shared/environment/env.js';

import LibrariesRepository from '../repositories/LibrariesRepository';
import HashProvider from '@utils/HashProvider';

interface IRequest {
	email: string;
	password: string;
}

interface IResponse {
	library: Library;
	token: string;
}

export default class LibraryAuthenticateService {
	private repository: LibrariesRepository;

	constructor() {
		this.repository = getCustomRepository(LibrariesRepository);
	}

	public async execute({ email, password }: IRequest): Promise<IResponse> {
		const library = await this.repository.findByEmail(email);

		if (!library) throw new AppError('Email and password does not match', 401);

		const isPasswordValid = await HashProvider.compareHash(
			password,
			library.password,
		);

		if (!isPasswordValid)
			throw new AppError('Email and password does not match', 401);

		const token = sign({}, env.jwtSecret, {
			expiresIn: env.jwtExpiresIn,
			subject: library.id,
		});

		return {
			library,
			token,
		};
	}
}
