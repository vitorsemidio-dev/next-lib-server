import AppError from '@shared/errors/AppError';
import slugfy from '@utils/slugfy';

import INameAvailabilityRepository from '../repositories/interfaces/INameAvailabilityRepository';

export default class CheckNameAvailabilityService {
	constructor(private entityRepository: INameAvailabilityRepository) {}

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
