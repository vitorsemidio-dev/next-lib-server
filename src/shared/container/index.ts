import { container } from 'tsyringe';

import IBooksRepository from '@modules/libraries/repositories/interfaces/IBooksRepository';
import BooksRepository from '@modules/libraries/repositories/BooksRepository';
import ILibrariesRepository from '@modules/libraries/repositories/interfaces/ILibrariesRepository';
import LibrariesRepository from '@modules/libraries/repositories/LibrariesRepository';
import IStockLibraryRepository from '@modules/libraries/repositories/interfaces/IStockLibraryRepository';
import StockLibraryRepository from '@modules/libraries/repositories/StockLibraryRepository';

import IUsersRepository from '@modules/users/repositories/interfaces/IUsersRepository';
import UsersRepository from '@modules/users/repositories/UsersRepository';

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
