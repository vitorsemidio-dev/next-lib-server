import AppError from '@shared/errors/AppError';

import IEmailAvailabilityRepository from '../repositories/interfaces/IEmailAvailabilityRepository';

export default class CheckEmailAvailabilityService {
	constructor(private entityRepository: IEmailAvailabilityRepository) {}

	public async execute(email: string) {
		const isEmailAvailable = await this.entityRepository.checkEmailAvailability(
			email,
		);

		if (!isEmailAvailable) {
			throw new AppError('E-mail is already used', 422);
		}

		return true;
	}
}
