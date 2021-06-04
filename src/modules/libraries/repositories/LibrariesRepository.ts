import { Repository, getRepository } from 'typeorm';

import ICreateLibraryDTO from '@modules/libraries/dtos/ICreateLibraryDTO';
import Library from '@shared/database/entities/Library';
import slugfy from '@utils/slugfy';

import ILibrariesRepository from './interfaces/ILibrariesRepository';
import IEmailAvailabilityRepository from './interfaces/IEmailAvailabilityRepository';
import INameAvailabilityRepository from './interfaces/INameAvailabilityRepository';

class LibrariesRepository
	implements
		ILibrariesRepository,
		INameAvailabilityRepository,
		IEmailAvailabilityRepository
{
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

	public async checkNameAvailability(name: string) {
		const slug = slugfy(name);
		const isNameUsed = await this.findBySlug(slug);

		if (isNameUsed) {
			return false;
		}

		return true;
	}

	public async checkEmailAvailability(email: string) {
		const isEmailUsed = await this.findByEmail(email);

		if (isEmailUsed) {
			return false;
		}

		return true;
	}
}

export default LibrariesRepository;
