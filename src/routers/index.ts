/** @format */

import { Router } from 'express';

import booksRouter from './books.router';
import librariesRouter from './libraries.router';
import usersRouter from './users.router';
import profileRouter from './profile.router';
import sessionsRouter from './sessions.router';

const routers = Router();

routers.use('/books', booksRouter);
routers.use('/users', usersRouter);
routers.use('/profile', profileRouter);
routers.use('/sessions', sessionsRouter);
routers.use('/libraries', librariesRouter);

export default routers;
