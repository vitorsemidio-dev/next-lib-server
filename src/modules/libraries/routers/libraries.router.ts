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

// Library
librariesRouter.post(
	'/',
	imageUpload.single('image'),
	librariesController.create,
);
librariesRouter.get('/', librariesController.list);
librariesRouter.get('/:slug', librariesController.show);
librariesRouter.put(
	'/:library_id',
	imageUpload.single('image'),
	librariesController.update,
);
librariesRouter.patch(
	'/:library_id',
	imageUpload.single('image'),
	librariesController.update,
);

// Stock Library
librariesRouter.post('/stock', stockLibraryController.create);
librariesRouter.get('/stock/:library_id', stockLibraryController.list);

// Others
librariesRouter.post('/register-book', stockLibraryController.registerBook);
librariesRouter.post('/sessions', sessionsLibraryController.create);
librariesRouter.post('/rent', rentBooksController.create);

// Availability
librariesRouter.post(
	'/check-availability/name',
	librariesController.checkNameAvailability,
);
librariesRouter.post(
	'/check-availability/email',
	librariesController.checkEmailAvailability,
);

export default librariesRouter;
