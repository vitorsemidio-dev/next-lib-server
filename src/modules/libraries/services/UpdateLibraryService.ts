import { inject, injectable } from 'tsyringe';

import Library from '@shared/database/entities/Library';
import AppError from '@shared/errors/AppError';
import HashProvider from '@utils/HashProvider';
import slugfy from '@utils/slugfy';

import LibrariesRepository from '../repositories/LibrariesRepository';

interface IRequest {
	id: string;
	name: string;
	email: string;
	password?: string;
	avatar?: string;
}

@injectable()
export default class UpdateLibraryService {
	constructor(
		@inject('LibrariesRepository')
		private librariesRepository: LibrariesRepository,
	) {}

	public async execute({
		id,
		name,
		email,
		password,
		avatar,
	}: IRequest): Promise<Library> {
		const library = await this.librariesRepository.findById(id);

		if (!library) {
			throw new AppError('Library does not found', 404);
		}

		if (email && email !== library.email) {
			const isEmailAvailable =
				await this.librariesRepository.checkEmailAvailability(email);

			if (!isEmailAvailable) {
				throw new AppError('E-mail is already used', 400);
			}
		}

		if (name && name !== library.name) {
			const isNameAvailable =
				await this.librariesRepository.checkNameAvailability(name);

			if (!isNameAvailable) {
				throw new AppError('Name is already used', 400);
			}
		}

		const slug = slugfy(name);

		let hashedPassword = null;

		if (password) {
			hashedPassword = await HashProvider.generateHash(password);
		}

		const newDataLibrary = Object.assign(library, {
			name,
			slug,
			email,
			avatar,
			password: hashedPassword || library.password,
		});

		await this.librariesRepository.update(newDataLibrary);

		return newDataLibrary;
	}
}
