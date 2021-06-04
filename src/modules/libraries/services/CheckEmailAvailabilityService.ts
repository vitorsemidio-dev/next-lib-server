import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ILibrariesRepository from '../repositories/interfaces/ILibrariesRepository';

@injectable()
export default class CheckEmailAvailabilityService {
	constructor(
		@inject('LibrariesRepository')
		private librariesRepository: ILibrariesRepository,
	) {}

	public async execute(email: string) {
		const emailUsed = await this.librariesRepository.findByEmail(email);

		if (emailUsed) {
			throw new AppError('E-mail is already used', 422);
		}

		return true;
	}
}
