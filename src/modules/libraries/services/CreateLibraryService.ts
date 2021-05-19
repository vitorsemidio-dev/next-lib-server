/** @format */

import { getCustomRepository } from 'typeorm';

import slugfy from '@utils/slugfy';
import HashProvider from '@utils/HashProvider';

import LibrariesRepository from '../repositories/LibrariesRepository';
import Library from '@shared/database/entities/Library';
import AppError from '@shared/errors/AppError';

interface IRequest {
	name: string;
	email: string;
	password: string;
	avatar: string;
}

export default class CreateLibraryService {
	private repository: LibrariesRepository;

	constructor() {
		this.repository = getCustomRepository(LibrariesRepository);
	}

	public async execute({
		name,
		email,
		password,
		avatar,
	}: IRequest): Promise<Library> {
		let libraryCheck: Library | undefined;
		libraryCheck = await this.repository.findByEmail(email);

		if (libraryCheck)
			throw new AppError(`Email "${email}" is already used`, 400);

		const slug = slugfy(name);
		libraryCheck = await this.repository.findBySlug(slug);

		if (libraryCheck)
			throw new AppError(`The name "${name}" is already used`, 400);

		const passwordHashed = await HashProvider.generateHash(password);

		const library = this.repository.create({
			name,
			slug,
			email,
			password: passwordHashed,
			avatar,
		});

		await this.repository.save(library);

		return library;
	}
}
