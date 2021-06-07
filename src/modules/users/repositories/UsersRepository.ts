import { getRepository, Repository } from 'typeorm';

import User from '@shared/database/entities/User';

import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUsersRepository from './interfaces/IUsersRepository';
import IEmailAvailabilityRepository from './interfaces/IEmailAvailabilityRepository';

class UsersRepository
	implements IUsersRepository, IEmailAvailabilityRepository
{
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

	public async userDetail(id: string): Promise<User | undefined> {
		const user = await this.ormRepository.findOne(id, {
			relations: ['bookRented'],
		});

		return user;
	}

	public async checkEmailAvailability(email: string) {
		const isEmailUsed = await this.findByEmail(email);

		if (isEmailUsed) {
			return false;
		}

		return true;
	}

	public async update(user: User) {
		const userUpdated = await this.ormRepository.save(user);

		return userUpdated;
	}
}

export default UsersRepository;
