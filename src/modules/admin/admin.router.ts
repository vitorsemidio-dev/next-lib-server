/** @format */

import { Router } from 'express';

import AdminController from './AdminController';

const adminRouter = Router();

adminRouter.post('/books', AdminController.createBooks);
adminRouter.post('/libraries', AdminController.createLibraries);
adminRouter.post('/users', AdminController.createUsers);

export default adminRouter;
