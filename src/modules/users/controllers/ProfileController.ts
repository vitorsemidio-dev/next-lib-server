/** @format */

import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

import UsersRepository from '../repositories/UsersRepository';

let usersRepository: UsersRepository;

export default class ProfileController {
	public async show(request: Request, response: Response): Promise<Response> {
		const { id } = request.user;

		usersRepository = getCustomRepository(UsersRepository);

		const user = await usersRepository.findOne(id);

		if (!user) throw new AppError('User does not found', 404);

		return response.json(user);
	}
}
