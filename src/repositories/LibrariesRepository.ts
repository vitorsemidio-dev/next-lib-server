/** @format */

import { Repository, EntityRepository } from 'typeorm';

import Library from '../database/entities/Library';

@EntityRepository(Library)
class LibrariesRepository extends Repository<Library> {}

export default LibrariesRepository;
