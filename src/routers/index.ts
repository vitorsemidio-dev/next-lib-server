/** @format */

import { Router } from 'express';

import usersRouter from './users.router';

const routers = Router();

routers.use('/users', usersRouter);

export default routers;
