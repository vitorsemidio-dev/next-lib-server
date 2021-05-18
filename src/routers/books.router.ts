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

booksRouter.get('/', booksController.index);

booksRouter.post('/', upload.single('avatar'), booksController.create);

export default booksRouter;
