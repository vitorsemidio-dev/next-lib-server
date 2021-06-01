import { Router } from 'express';

import LibrariesController from '../controllers/LibrariesController';
import RentBooksController from '../controllers/RentBooksController';
import SessionsLibraryController from '../controllers/SessionsLibraryController';
import StockLibraryController from '../controllers/StockLibraryController';
import imageUpload from '@shared/middlewares/imageUpload';

import RentBookService from '../services/RentBookService';

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

// librariesRouter.post('/rent', async (request, response) => {
// 	const { user_id, stock_library_id } = request.body;
// 	const rentBookService = new RentBookService();

// 	const bookRented = await rentBookService.execute({
// 		user_id,
// 		stock_library_id,
// 	});

// 	return response.json(bookRented);
// });

librariesRouter.post('/rent', rentBooksController.create);

librariesRouter.get('/rent', async (request, response) => {
	const rentBookService = new RentBookService();

	const booksRented = await rentBookService.executeList();
	return response.json(booksRented);
});

librariesRouter.get('/', librariesController.list);
librariesRouter.get('/:slug', librariesController.show);

export default librariesRouter;
