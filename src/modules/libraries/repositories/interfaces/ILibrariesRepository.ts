import ICreateLibraryDTO from '@modules/libraries/dtos/ICreateLibraryDTO';
import Library from '@shared/database/entities/Library';

export default interface ILibrariesRepository {
	create(data: ICreateLibraryDTO): Promise<Library>;
	find(): Promise<Library[]>;
	findByEmail(email: string): Promise<Library | undefined>;
	findBySlug(slug: string): Promise<Library | undefined>;
	findById(id: string): Promise<Library | undefined>;
	update(data: Library): Promise<Library>;
}
