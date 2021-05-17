/** @format */

import 'express-async-errors';
import 'reflect-metadata';

import './database';
import express, { Request, Response, NextFunction } from 'express';

import uploadConfig from './config/upload';
import routers from './routers';

const app = express();
app.use(express.json());
app.use(routers);

app.use('/files', express.static(uploadConfig.destination));

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
	console.error(err);

	return response.status(500).json({
		status: 'error',
		message: 'Internal server error',
	});
});

export default app;
