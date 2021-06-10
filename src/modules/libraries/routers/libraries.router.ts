import { Router } from 'express';

import LibrariesController from '@modules/libraries/controllers/LibrariesController';
import StockLibraryController from '@modules/libraries/controllers/StockLibraryController';
import ensureLibraryAuthenticated from '@modules/libraries/middlewares/ensureLibraryAuthenticated';
import sessionsRouter from '@modules/libraries/routers/sessions.router';
import imageUpload from '@shared/middlewares/imageUpload';

const librariesRouter = Router();

const librariesController = new LibrariesController();
const stockLibraryController = new StockLibraryController();

librariesRouter.use(sessionsRouter);

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
	ensureLibraryAuthenticated,
	imageUpload.single('image'),
	librariesController.update,
);
librariesRouter.patch(
	'/:library_id',
	ensureLibraryAuthenticated,
	imageUpload.single('image'),
	librariesController.updateImage,
);

// Stock Library
librariesRouter.post(
	'/stock',
	ensureLibraryAuthenticated,
	stockLibraryController.create,
);
librariesRouter.get('/stock/:library_id', stockLibraryController.list);

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
