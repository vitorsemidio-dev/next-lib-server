/** @format */

import { hash, compare } from 'bcryptjs';

export default class HashProvider {
	static async generateHash(payload: string): Promise<string> {
		return hash(payload, 8);
	}

	static async compareHash(payload: string, hashed: string): Promise<boolean> {
		return compare(payload, hashed);
	}
}
