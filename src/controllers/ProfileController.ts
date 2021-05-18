/** @format */

import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import UsersRepository from '../repositories/UsersRepository';

let usersRepository: UsersRepository;

export default class ProfileController {
	public async show(request: Request, response: Response): Promise<Response> {
		const { id } = request.user;

		usersRepository = getCustomRepository(UsersRepository);

		const user = await usersRepository.findOne(id);

		return response.json(user);
	}
}
