/** @format */

import faker from 'faker';

import HashProvider from '@utils/HashProvider';
import slugfy from '@utils/slugfy';

export default async function userFactory(quantity = 10) {
	const libraries = [];

	for (let i = 0; i < quantity; i++) {
		const companyName = faker.company.companyName();
		const lastName = faker.name.lastName();
		const name = `${companyName} ${lastName}`;
		const slug = slugfy(name);
		const email = `${lastName}@$nextlib.com`.replace(' ', '').toLowerCase();
		const password = await HashProvider.generateHash('123456');

		libraries.push({
			name,
			slug,
			email,
			password,
			avatar: 'null',
		});
	}

	return libraries;
}
