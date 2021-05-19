/** @format */

import { getRepository, Repository } from 'typeorm';

import User from '@shared/database/entities/User';

import IUsersRepository from './IUsersRepository';
import ICreateUserDTO from './ICreateUserDTO';

class UsersRepository implements IUsersRepository {
	private ormRepository: Repository<User>;

	constructor() {
		this.ormRepository = getRepository(User);
	}
	public async findByEmail(email: string): Promise<User | undefined> {
		const user = await this.ormRepository.findOne({
			where: {
				email,
			},
		});

		return user;
	}

	public async create({
		email,
		name,
		password,
		avatar,
	}: ICreateUserDTO): Promise<User> {
		const user = this.ormRepository.create({
			email,
			name,
			password,
			avatar,
		});

		await this.ormRepository.save(user);

		return user;
	}
}

export default UsersRepository;
