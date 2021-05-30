/** @format */

import { Router } from 'express';

import BooksController from '../controllers/BooksController';
import imageUpload from '@shared/middlewares/imageUpload';

const booksRouter = Router();

const booksController = new BooksController();

booksRouter.get('/', booksController.list);
booksRouter.get('/:slug', booksController.show);

booksRouter.post('/', imageUpload.single('image'), booksController.create);

export default booksRouter;
