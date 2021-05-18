/** @format */

import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';

import UsersController from '../controllers/UsersController';

const usersController = new UsersController();

const usersRouter = Router();

const upload = multer({
	dest: uploadConfig.destination,
	storage: uploadConfig.storage,
});

usersRouter.get('/', usersController.list);

usersRouter.post('/', upload.single('image'), usersController.create);

export default usersRouter;
