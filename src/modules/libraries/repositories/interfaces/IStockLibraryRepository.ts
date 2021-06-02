import IAddBookToStockLibraryDTO from '@modules/libraries/dtos/IAddBookToStockLibraryDTO';
import StockLibrary from '@shared/database/entities/StockLibrary';

export default interface IStockLibraryRepository {
	create(data: IAddBookToStockLibraryDTO): Promise<StockLibrary>;
	find(): Promise<StockLibrary[]>;
	findById(id: string): Promise<StockLibrary | undefined>;
	findByIds(ids: string[], relations: string[]): Promise<StockLibrary[]>;
	findStocksWithLibraryId(id: string): Promise<StockLibrary[]>;
	findStockWithBookId(
		id: string,
		relations: string[],
	): Promise<StockLibrary | undefined>;
}
