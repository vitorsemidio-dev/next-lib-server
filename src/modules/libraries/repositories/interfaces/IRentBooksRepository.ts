import RentBook from '@shared/database/entities/RentBook';

interface IRentBookDTO {
	user_id: string;
	stock_library_id: string;
}

export default interface IRentBooksRepository {
	createInstance(data: IRentBookDTO): RentBook;
	findByUserId(user_id: string): Promise<RentBook[]>;
}
