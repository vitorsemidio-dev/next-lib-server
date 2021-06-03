import { Request, Response, Router } from 'express';

import LibrariesController from '../controllers/LibrariesController';
import RentBooksController from '../controllers/RentBooksController';
import SessionsLibraryController from '../controllers/SessionsLibraryController';
import StockLibraryController from '../controllers/StockLibraryController';
import imageUpload from '@shared/middlewares/imageUpload';
import AppError from '@shared/errors/AppError';

const librariesRouter = Router();

const librariesController = new LibrariesController();
const rentBooksController = new RentBooksController();
const stockLibraryController = new StockLibraryController();
const sessionsLibraryController = new SessionsLibraryController();

librariesRouter.post(
	'/',
	imageUpload.single('image'),
	librariesController.create,
);

librariesRouter.post('/stock', stockLibraryController.create);
librariesRouter.get('/stock/:library_id', stockLibraryController.list);

librariesRouter.post('/register-book', stockLibraryController.registerBook);

librariesRouter.post('/sessions', sessionsLibraryController.create);

librariesRouter.post('/rent', rentBooksController.create);

librariesRouter.post(
	'/check-available/name',
	async (request: Request, response: Response) => {
		const { name } = request.body;

		if (name === 'nome usado') {
			throw new AppError('name is already used', 422);
		}

		return response.json({
			available: true,
			name,
		});
	},
);

librariesRouter.post(
	'/check-available/email',
	async (request: Request, response: Response) => {
		const { email } = request.body;

		if (email === 'email@email.com') {
			throw new AppError('email is already used', 422);
		}

		return response.json({
			available: true,
			email,
		});
	},
);

librariesRouter.get('/', librariesController.list);
librariesRouter.get('/:slug', librariesController.show);

export default librariesRouter;
