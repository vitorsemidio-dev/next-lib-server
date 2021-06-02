import { inject, injectable } from 'tsyringe';

import ILibrariesRepository from '@modules/libraries/repositories/interfaces/ILibrariesRepository';
import IStockLibraryRepository from '@modules/libraries/repositories/interfaces/IStockLibraryRepository';
import AppError from '@shared/errors/AppError';
import StockLibrary from '@shared/database/entities/StockLibrary';

interface IRequest {
	library_id: string;
}

@injectable()
export default class ListStockLibraryService {
	constructor(
		@inject('LibrariesRepository')
		private librariesRepository: ILibrariesRepository,
		@inject('StockLibraryRepository')
		private stockLibraryRepository: IStockLibraryRepository,
	) {}

	public async execute({ library_id }: IRequest): Promise<StockLibrary[]> {
		const library = await this.librariesRepository.findById(library_id);

		if (!library) throw new AppError('Library does not found', 404);

		const stock = await this.stockLibraryRepository.findStocksWithLibraryId(
			library_id,
		);

		if (!stock || stock.length === 0) {
			return [];
		}

		return stock;
	}
}
