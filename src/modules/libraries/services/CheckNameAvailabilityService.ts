import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import slugfy from '@utils/slugfy';

import ILibrariesRepository from '../repositories/interfaces/ILibrariesRepository';
import INameAvailabilityRepository from '../repositories/interfaces/INameAvailabilityRepository';

// @injectable()
export default class CheckNameAvailabilityService {
	constructor(
		// @inject('LibrariesRepository')
		private entityRepository: INameAvailabilityRepository,
	) {}

	public async execute(name: string) {
		const slug = slugfy(name);
		const isNameAvailable = await this.entityRepository.checkNameAvailability(
			slug,
		);

		if (!isNameAvailable) {
			throw new AppError('Name is already used', 422);
		}

		return true;
	}
}
