import { Router } from 'express';

import BooksController from '@modules/libraries/controllers/BooksController';
import ensureLibraryAuthenticated from '@modules/libraries/middlewares/ensureLibraryAuthenticated';
import imageUpload from '@shared/middlewares/imageUpload';

const booksRouter = Router();

const booksController = new BooksController();

booksRouter.get('/', booksController.list);
booksRouter.get('/:slug', booksController.show);

booksRouter.post(
	'/',
	ensureLibraryAuthenticated,
	imageUpload.single('image'),
	booksController.create,
);
booksRouter.put(
	'/:book_id',
	ensureLibraryAuthenticated,
	booksController.update,
);
booksRouter.patch(
	'/:book_id',
	ensureLibraryAuthenticated,
	imageUpload.single('image'),
	booksController.updateAvatar,
);
booksRouter.delete(
	'/:book_id',
	ensureLibraryAuthenticated,
	booksController.remove,
);

booksRouter.post(
	'/check-availability/name',
	booksController.checkNameAvailability,
);

export default booksRouter;
