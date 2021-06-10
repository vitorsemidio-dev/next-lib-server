import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import ILibrariesRepository from '@modules/libraries/repositories/interfaces/ILibrariesRepository';
import Library from '@shared/database/entities/Library';
import env from '@shared/environment/env.js';
import AppError from '@shared/errors/AppError';
import HashProvider from '@utils/HashProvider';

interface IRequest {
	email: string;
	password: string;
}

interface IResponse {
	library: Library;
	token: string;
}

@injectable()
export default class LibraryAuthenticateService {
	constructor(
		@inject('LibrariesRepository')
		private librariesRepository: ILibrariesRepository,
	) {}

	public async execute({ email, password }: IRequest): Promise<IResponse> {
		const library = await this.librariesRepository.findByEmail(email);

		if (!library) throw new AppError('Email and password does not match', 401);

		const isPasswordValid = await HashProvider.compareHash(
			password,
			library.password,
		);

		if (!isPasswordValid)
			throw new AppError('Email and password does not match', 401);

		const token = sign({}, env.jwtSecretLibrary, {
			expiresIn: env.jwtExpiresIn,
			subject: library.id,
		});

		return {
			library,
			token,
		};
	}
}
