/** @format */

import { container } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/interfaces/IUsersRepository';
import UsersRepository from '@modules/users/repositories/implementations/UsersRepository';

container.registerSingleton<IUsersRepository>(
	'UsersRepository',
	UsersRepository,
);
