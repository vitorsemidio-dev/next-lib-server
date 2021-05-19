/** @format */

import { container } from 'tsyringe';

import IBooksRepository from '@modules/libraries/repositories/interfaces/IBooksRepository';
import BooksRepository from '@modules/libraries/repositories/implementations/BooksRepository';
import ILibrariesRepository from '@modules/libraries/repositories/interfaces/ILibrariesRepository';
import LibrariesRepository from '@modules/libraries/repositories/implementations/LibrariesRepository';
import IStockLibraryRepository from '@modules/libraries/repositories/interfaces/IStockLibraryRepository';
import StockLibraryRepository from '@modules/libraries/repositories/implementations/StockLibraryRepository';

import IUsersRepository from '@modules/users/repositories/interfaces/IUsersRepository';
import UsersRepository from '@modules/users/repositories/implementations/UsersRepository';

container.registerSingleton<IBooksRepository>(
	'BooksRepository',
	BooksRepository,
);

container.registerSingleton<ILibrariesRepository>(
	'LibrariesRepository',
	LibrariesRepository,
);

container.registerSingleton<IStockLibraryRepository>(
	'StockLibraryRepository',
	StockLibraryRepository,
);

container.registerSingleton<IUsersRepository>(
	'UsersRepository',
	UsersRepository,
);
