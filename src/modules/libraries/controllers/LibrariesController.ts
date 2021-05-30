import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import CreateLibraryService from '../services/CreateLibraryService';
import LibrariesRepository from '../repositories/LibrariesRepository';

export default class LibrariesController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { name, email, password } = request.body;
		const { filename: avatar } = request.file;

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

		const hostUrl = 'http://localhost:3333';

		const librariesViewModel = libraries.map((item) => ({
			...item,
			imgUrl: `${hostUrl}/files/${item.avatar}`,
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

		const hostUrl = 'http://localhost:3333';

		const libraryViewModel = {
			...library,
			imgUrl: `${hostUrl}/files/${library.avatar}`,
		};

		return response.json(libraryViewModel);
	}
}
