/** @format */

import {} from 'typeorm';
import { container } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import StockLibrary from '@shared/database/entities/StockLibrary';

import LibrariesRepository from '../repositories/LibrariesRepository';
import StockLibraryRepository from '../repositories/StockLibraryRepository';

interface IRequest {
	library_id: string;
}

export default class ListStockLibrary {
	private librariesRepository: LibrariesRepository;
	private stockLibraryRepository: StockLibraryRepository;

	constructor() {
		this.librariesRepository = container.resolve('LibrariesRepository');
		this.stockLibraryRepository = container.resolve('StockLibraryRepository');
	}

	public async execute({ library_id }: IRequest): Promise<StockLibrary[]> {
		const library = await this.librariesRepository.findById(library_id);

		if (!library) throw new AppError('Library does not found', 404);

		const stock = await this.stockLibraryRepository.findStocksWithLibraryId(
			library_id,
		);

		if (!stock || stock.length === 0) {
			throw new AppError('Library without books', 404);
		}

		return stock;
	}
}
