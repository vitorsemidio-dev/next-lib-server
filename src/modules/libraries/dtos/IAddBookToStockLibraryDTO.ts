/** @format */

import Library from '@shared/database/entities/Library';
import Book from '@shared/database/entities/Book';
/** @format */

export default interface IAddBookToStockLibraryDTO {
	book: Book;
	library: Library;
	quantity: number;
}
