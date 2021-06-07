import User from '@shared/database/entities/User';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import IEmailAvailabilityRepository from './IEmailAvailabilityRepository';

export default interface IUsersRepository extends IEmailAvailabilityRepository {
	create(data: ICreateUserDTO): Promise<User>;
	find(): Promise<User[]>;
	findByEmail(email: string): Promise<User | undefined>;
	findById(id: string): Promise<User | undefined>;
	userDetail(id: string): Promise<User | undefined>;
	update(data: User): Promise<User>;
}
