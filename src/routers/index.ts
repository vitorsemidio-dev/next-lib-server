/** @format */

import { Router } from 'express';

import usersRouter from './users.router';
import sessionsRouter from './sessions.router';

const routers = Router();

routers.use('/users', usersRouter);
routers.use('/sessions', sessionsRouter);

export default routers;
