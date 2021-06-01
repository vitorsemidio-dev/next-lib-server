interface IRequest {
	user_id: string;
	book_id: string;
}

export default class UserRentBookService {
	public async execute({ user_id, book_id }: IRequest): Promise<any> {
		console.log('UserRentBookService');
		console.log(`User Id: [${user_id}] | Book Id: [${book_id}]`);

		return {
			user_id,
			book_id,
		};
	}
}
