/** @format */

import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';
import BooksController from '../controllers/BooksController';

const booksRouter = Router();
const upload = multer({
	dest: uploadConfig.destination,
	storage: uploadConfig.storage,
});

const booksController = new BooksController();

booksRouter.get('/', booksController.list);

booksRouter.post('/', upload.single('image'), booksController.create);

export default booksRouter;
