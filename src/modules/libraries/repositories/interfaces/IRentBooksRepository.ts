import IRentBookDTO from '@modules/libraries/dtos/IRentBookDTO';
import RentBook from '@shared/database/entities/RentBook';

export default interface IRentBooksRepository {
	createInstance(data: IRentBookDTO): RentBook;
	findByUserId(user_id: string): Promise<RentBook[]>;
	delete(rent_book_id: string): Promise<void>;
}
