/** @format */

import { Router } from 'express';

import librariesRouter from './libraries.router';
import usersRouter from './users.router';
import profileRouter from './profile.router';
import sessionsRouter from './sessions.router';

const routers = Router();

routers.use('/users', usersRouter);
routers.use('/profile', profileRouter);
routers.use('/sessions', sessionsRouter);
routers.use('/libraries', librariesRouter);

export default routers;
