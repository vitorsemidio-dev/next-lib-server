import { Router } from 'express';

import ensureAuthenticated from '@shared/middlewares/ensureAuthenticated';
import imageUpload from '@shared/middlewares/imageUpload';

import UsersController from '../controllers/UsersController';
import BooksRentedController from '../controllers/BooksRentedController';

const usersController = new UsersController();
const booksRentedController = new BooksRentedController();

const usersRouter = Router();

usersRouter.get('/', usersController.list);
usersRouter.post('/', imageUpload.single('image'), usersController.create);
usersRouter.get('/:user_id', ensureAuthenticated, usersController.detail);
usersRouter.put('/:user_id', ensureAuthenticated, usersController.update);
usersRouter.patch(
	'/:user_id',
	ensureAuthenticated,
	imageUpload.single('image'),
	usersController.updateImage,
);

usersRouter.post(
	'/check-availability/email',
	usersController.checkEmailAvailability,
);

usersRouter.use(ensureAuthenticated);
usersRouter.post('/:user_id/books-rented', booksRentedController.create);
usersRouter.get('/:user_id/books-rented', booksRentedController.list);
usersRouter.delete('/:user_id/books-rented', booksRentedController.remove);

export default usersRouter;
