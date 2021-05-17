/** @format */

import { Router } from 'express';

import UsersController from '../controllers/UsersController';

const usersController = new UsersController();

const usersRouter = Router();

usersRouter.get('/', usersController.list);

usersRouter.post('/', usersController.create);

export default usersRouter;
