/** @format */

import faker from 'faker';
import HashProvider from '@utils/HashProvider';

export default async function userFactory(quantity = 10) {
	const users = [];

	for (let i = 0; i < quantity; i++) {
		const name = `${faker.name.firstName()} ${faker.name.lastName()}`;
		const email = `${name.replace(' ', '-').toLowerCase()}@test.com`;
		const password = await HashProvider.generateHash('123456');

		users.push({
			name,
			email,
			password,
		});
	}

	return users;
}
