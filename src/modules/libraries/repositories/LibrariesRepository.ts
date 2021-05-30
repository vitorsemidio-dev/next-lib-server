import { Repository, getRepository } from 'typeorm';

import Library from '@shared/database/entities/Library';
import ILibrariesRepository from './interfaces/ILibrariesRepository';
import ICreateLibraryDTO from '@modules/libraries/dtos/ICreateLibraryDTO';

class LibrariesRepository implements ILibrariesRepository {
	private ormRepository: Repository<Library>;
	constructor() {
		this.ormRepository = getRepository(Library);
	}
	public async findByEmail(email: string): Promise<Library | undefined> {
		const library = await this.ormRepository.findOne({
			where: { email },
		});

		return library;
	}

	public async findBySlug(slug: string): Promise<Library | undefined> {
		const library = await this.ormRepository.findOne({
			where: { slug },
		});

		return library;
	}

	public async create(libraryData: ICreateLibraryDTO): Promise<Library> {
		const library = this.ormRepository.create(libraryData);

		await this.ormRepository.save(library);

		return library;
	}

	public async find(): Promise<Library[]> {
		const libraries = await this.ormRepository.find();

		return libraries;
	}

	public async findById(id: string) {
		const library = await this.ormRepository.findOne(id);

		return library;
	}
}

export default LibrariesRepository;
