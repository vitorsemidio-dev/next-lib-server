import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '../errors/AppError';
import env from '../environment/env';

interface TokenPayload {
	iat: number;
	exp: number;
	sub: string;
}

export default function ensureAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction,
) {
	const authHeader = request.headers.authorization;

	if (!authHeader) throw new AppError('JWT token is missing', 401);

	const [, token] = authHeader.split(' ');

	try {
		const { sub } = verify(token, env.jwtSecret) as TokenPayload;

		request.user = {
			id: sub,
		};
	} catch (error) {
		throw new AppError('Invalid JWT token', 401);
	}

	return next();
}
