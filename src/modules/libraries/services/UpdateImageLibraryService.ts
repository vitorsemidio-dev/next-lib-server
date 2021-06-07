import fs from 'fs';
import path from 'path';
import { inject, injectable } from 'tsyringe';

import ILibrariesRepository from '@modules/libraries/repositories/interfaces/ILibrariesRepository';
import uploadConfig from '@shared/config/upload';
import AppError from '@shared/errors/AppError';

interface IRequest {
	library_id: string;
	filename: string;
}

@injectable()
export default class UpdateImageLibraryService {
	constructor(
		@inject('LibrariesRepository')
		private librariesRepository: ILibrariesRepository,
	) {}

	public async execute({ library_id, filename }: IRequest) {
		const library = await this.librariesRepository.findById(library_id);

		if (!library) {
			throw new AppError('Library does not found', 404);
		}

		if (library.avatar) {
			await this.deleteImageFile(library.avatar);
		}

		library.avatar = filename;

		const libraryUpdated = await this.librariesRepository.update(library);

		return libraryUpdated;
	}

	private async deleteImageFile(filename: string) {
		const filePath = path.resolve(uploadConfig.destination, filename);

		try {
			await fs.promises.stat(filePath);
		} catch (err) {
			return;
		}

		await fs.promises.unlink(filePath);
	}
}
