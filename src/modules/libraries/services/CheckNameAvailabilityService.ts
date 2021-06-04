import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import slugfy from '@utils/slugfy';

import ILibrariesRepository from '../repositories/interfaces/ILibrariesRepository';

@injectable()
export default class CheckNameAvailabilityService {
	constructor(
		@inject('LibrariesRepository')
		private librariesRepository: ILibrariesRepository,
	) {}

	public async execute(name: string) {
		const slug = slugfy(name);
		const nameUsed = await this.librariesRepository.findBySlug(slug);

		if (nameUsed) {
			throw new AppError('Name is already used', 422);
		}

		return true;
	}
}
