import { Router } from 'express';

import imageUpload from '@shared/middlewares/imageUpload';
import ensureUserAuthenticated from '@modules/users/middlewares/ensureUserAuthenticated';
import UsersController from '@modules/users/controllers/UsersController';
import BooksRentedController from '@modules/users/controllers/BooksRentedController';
import sessionsRouter from '@modules/users/routers/sessions.router';

const usersController = new UsersController();
const booksRentedController = new BooksRentedController();

const usersRouter = Router();

usersRouter.use(sessionsRouter);

usersRouter.get('/', usersController.list);
usersRouter.post('/', imageUpload.single('image'), usersController.create);
usersRouter.get('/:user_id', ensureUserAuthenticated, usersController.detail);
usersRouter.put('/:user_id', ensureUserAuthenticated, usersController.update);
usersRouter.patch(
	'/:user_id',
	ensureUserAuthenticated,
	imageUpload.single('image'),
	usersController.updateImage,
);

usersRouter.post(
	'/check-availability/email',
	usersController.checkEmailAvailability,
);

usersRouter.use(ensureUserAuthenticated);
usersRouter.post('/:user_id/books-rented', booksRentedController.create);
usersRouter.get('/:user_id/books-rented', booksRentedController.list);
usersRouter.delete('/:user_id/books-rented', booksRentedController.remove);

export default usersRouter;
