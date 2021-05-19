/** @format */

import { Router } from 'express';

import booksRouter from '../../modules/libraries/routers/books.router';
import librariesRouter from '../../modules/libraries/routers/libraries.router';
import usersRouter from '../../modules/users/routers/users.router';
import profileRouter from '../../modules/users/routers/profile.router';
import sessionsRouter from '../../modules/users/routers/sessions.router';

const routers = Router();

routers.use('/books', booksRouter);
routers.use('/users', usersRouter);
routers.use('/profile', profileRouter);
routers.use('/sessions', sessionsRouter);
routers.use('/libraries', librariesRouter);

export default routers;
