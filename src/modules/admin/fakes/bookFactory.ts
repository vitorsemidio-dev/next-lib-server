/** @format */

import faker from 'faker';

import slugfy from '@utils/slugfy';

export default function userFactory(quantity = 10) {
	const books = [];

	for (let i = 0; i < quantity; i++) {
		const author = `${faker.name.firstName()} ${faker.name.lastName()}`;
		const name = `Music Book ${faker.music.genre()} ${faker.name.lastName()}`;
		const slug = slugfy(name);
		const pages = faker.datatype.number(500);

		books.push({
			author,
			name,
			pages,
			slug,
			picture: 'null',
		});
	}

	return books;
}
