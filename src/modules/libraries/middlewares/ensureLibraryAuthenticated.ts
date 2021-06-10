import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';
import env from '@shared/environment/env';

interface TokenPayload {
	iat: number;
	exp: number;
	sub: string;
}

export default function ensureLibraryAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction,
) {
	const authHeader = request.headers.authorization;

	if (!authHeader) throw new AppError('JWT token is missing', 401);

	const [, token] = authHeader.split(' ');

	try {
		const { sub } = verify(token, env.jwtSecret) as TokenPayload;

		request.library = {
			id: sub,
		};
	} catch (error) {
		throw new AppError('Invalid JWT token', 401);
	}

	return next();
}
