/** @format */

import { Repository, EntityRepository } from 'typeorm';

import Library from '@shared/database/entities/Library';

@EntityRepository(Library)
class LibrariesRepository extends Repository<Library> {
	public async findByEmail(email: string): Promise<Library | undefined> {
		const library = await this.findOne({
			where: { email },
		});

		return library;
	}

	public async findBySlug(slug: string): Promise<Library | undefined> {
		const library = await this.findOne({
			where: { slug },
		});

		return library;
	}
}

export default LibrariesRepository;
