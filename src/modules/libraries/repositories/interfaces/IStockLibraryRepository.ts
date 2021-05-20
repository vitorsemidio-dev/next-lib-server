/** @format */

import IAddBookToStockLibraryDTO from '@modules/libraries/dtos/IAddBookToStockLibraryDTO';
import StockLibrary from '@shared/database/entities/StockLibrary';

export default interface IStockLibraryRepository {
	create(data: IAddBookToStockLibraryDTO): Promise<StockLibrary>;
	find(): Promise<StockLibrary[]>;
	findById(id: string): Promise<StockLibrary | undefined>;
}
