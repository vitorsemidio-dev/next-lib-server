import { Router } from 'express';

import UsersController from '../controllers/UsersController';
import BooksRentedController from '../controllers/BooksRentedController';
import imageUpload from '@shared/middlewares/imageUpload';

const usersController = new UsersController();
const booksRentedController = new BooksRentedController();

const usersRouter = Router();

usersRouter.get('/', usersController.list);
usersRouter.get('/:user_id', usersController.detail);
usersRouter.post('/', imageUpload.single('image'), usersController.create);
usersRouter.put('/:user_id', usersController.update);
usersRouter.patch(
	'/:user_id',
	imageUpload.single('image'),
	usersController.updateImage,
);

usersRouter.post(
	'/check-availability/email',
	usersController.checkEmailAvailability,
);

usersRouter.post('/:user_id/books-rented', booksRentedController.create);
usersRouter.get('/:user_id/books-rented', booksRentedController.list);
usersRouter.delete('/:user_id/books-rented', booksRentedController.remove);

export default usersRouter;
