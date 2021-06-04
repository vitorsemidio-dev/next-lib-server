import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import LibrariesRepository from '../repositories/LibrariesRepository';
import CreateLibraryService from '../services/CreateLibraryService';
import CheckEmailAvailabilityService from '../services/CheckEmailAvailabilityService';

export default class LibrariesController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { name, email, password } = request.body;
		const avatar = request.file ? request.file.filename : '';

		const librariesRepository = container.resolve(LibrariesRepository);
		const createLibraryService = new CreateLibraryService(librariesRepository);

		const library = await createLibraryService.execute({
			name,
			email,
			password,
			avatar,
		});

		return response.json(library);
	}

	public async list(request: Request, response: Response): Promise<Response> {
		const librariesRepository = container.resolve(LibrariesRepository);

		const libraries = await librariesRepository.find();

		const librariesViewModel = libraries.map((library) => ({
			...classToClass(library),
		}));

		return response.json(librariesViewModel);
	}

	public async show(request: Request, response: Response) {
		const { slug } = request.params;
		const librariesRepository = container.resolve(LibrariesRepository);

		const library = await librariesRepository.findBySlug(slug);

		if (!library) {
			throw new AppError(`Biblioteca com slug "${slug}" não encontrada`, 404);
		}

		const libraryViewModel = {
			...classToClass(library),
		};

		return response.json(libraryViewModel);
	}

	public async checkNameAvailability(request: Request, response: Response) {
		const { name } = request.body;

		if (name === 'nome usado') {
			throw new AppError('name is already used', 422);
		}

		return response.json({
			available: true,
			name,
		});
	}

	public async checkEmailAvailability(request: Request, response: Response) {
		const { email } = request.body;

		const librariesRepository = container.resolve(LibrariesRepository);

		const checkEmailAvailabilityService = new CheckEmailAvailabilityService(
			librariesRepository,
		);

		const isEmailAvailable = await checkEmailAvailabilityService.execute(email);

		return response.json({
			available: isEmailAvailable,
			email,
		});
	}
}
