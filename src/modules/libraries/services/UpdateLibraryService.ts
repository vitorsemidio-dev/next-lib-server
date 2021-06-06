import { inject, injectable } from 'tsyringe';

import HashProvider from '@utils/HashProvider';

import LibrariesRepository from '../repositories/LibrariesRepository';
import Library from '@shared/database/entities/Library';

interface IRequest {
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
		name,
		email,
		password,
		avatar,
	}: IRequest): Promise<Library> {
		return {} as Library;
	}
}
