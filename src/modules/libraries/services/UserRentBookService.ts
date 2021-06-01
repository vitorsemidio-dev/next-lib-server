export default class UserRentBookService {
	public async execute(): Promise<any> {
		console.log('UserRentBookService');

		return {
			bookRented: true,
		};
	}
}
