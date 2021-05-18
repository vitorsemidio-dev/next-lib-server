/** @format */

import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

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
	try {
		const authHeader = request.headers.authorization;

		if (!authHeader) throw new Error('JWT token is missing');

		const [, token] = authHeader.split(' ');

		const { sub } = verify(token, env.jwtSecret) as TokenPayload;

		request.user = {
			id: sub,
		};

		return next();
	} catch (error) {
		throw new Error('Invalid JWT token');
	}
}
