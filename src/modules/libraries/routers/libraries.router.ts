import { Router } from 'express';

import LibrariesController from '../controllers/LibrariesController';
import RentBooksController from '../controllers/RentBooksController';
import SessionsLibraryController from '../controllers/SessionsLibraryController';
import StockLibraryController from '../controllers/StockLibraryController';
import imageUpload from '@shared/middlewares/imageUpload';

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

librariesRouter.get('/', librariesController.list);
librariesRouter.get('/:slug', librariesController.show);

export default librariesRouter;
