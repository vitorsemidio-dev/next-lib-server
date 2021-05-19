/** @format */

import { getRepository, Repository } from 'typeorm';

import User from '@shared/database/entities/User';

import IUsersRepository from '../interfaces/IUsersRepository';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

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

	public async find(): Promise<User[]> {
		const users = await this.ormRepository.find();

		return users;
	}

	public async findById(id: string): Promise<User | undefined> {
		const user = await this.ormRepository.findOne(id);

		return user;
	}
}

export default UsersRepository;
