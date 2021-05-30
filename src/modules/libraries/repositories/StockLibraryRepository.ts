import { getRepository, Repository } from 'typeorm';

import StockLibrary from '@shared/database/entities/StockLibrary';
import IStockLibraryRepository from './interfaces/IStockLibraryRepository';
import IAddBookToStockLibraryDTO from '@modules/libraries/dtos/IAddBookToStockLibraryDTO';

export default class StockLibraryRepository implements IStockLibraryRepository {
	private ormRepository: Repository<StockLibrary>;

	constructor() {
		this.ormRepository = getRepository(StockLibrary);
	}

	public async create(data: IAddBookToStockLibraryDTO): Promise<StockLibrary> {
		const stockItem = this.ormRepository.create(data);

		await this.ormRepository.save(stockItem);

		return stockItem;
	}

	public async find(): Promise<StockLibrary[]> {
		const stock = await this.ormRepository.find();

		return stock;
	}

	public async findById(id: string): Promise<StockLibrary | undefined> {
		const stockItem = await this.ormRepository.findOne(id);

		return stockItem;
	}

	public async findStocksWithLibraryId(id: string): Promise<StockLibrary[]> {
		const stocks = await this.ormRepository.find({
			where: {
				library_id: id,
			},
			relations: ['book'],
		});

		const stocksResult =
			stocks && stocks.filter((item) => item.book && item.book_id);

		return stocksResult || [];
	}
}
