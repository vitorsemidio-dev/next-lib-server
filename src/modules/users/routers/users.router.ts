/** @format */

import { Router } from 'express';

import UsersController from '../controllers/UsersController';
import imageUpload from '@shared/middlewares/imageUpload';

const usersController = new UsersController();

const usersRouter = Router();

usersRouter.get('/', usersController.list);

usersRouter.get('/:user_id', usersController.detail);

usersRouter.post('/', imageUpload.single('image'), usersController.create);

export default usersRouter;
