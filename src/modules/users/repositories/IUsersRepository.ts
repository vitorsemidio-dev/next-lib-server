/** @format */

import User from '@shared/database/entities/User';
import ICreateUserDTO from './ICreateUserDTO';

export default interface IUsersRepository {
	create(data: ICreateUserDTO): Promise<User>;
	findByEmail(email: string): Promise<User | undefined>;
}
