/** @format */

import User from '@shared/database/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
	create(data: ICreateUserDTO): Promise<User>;
	find(): Promise<User[]>;
	findByEmail(email: string): Promise<User | undefined>;
	findById(id: string): Promise<User | undefined>;
}
