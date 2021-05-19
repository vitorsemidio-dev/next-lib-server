/** @format */

import { Router } from 'express';

import LibrariesController from '../controllers/LibrariesController';
import SessionsLibraryController from '../controllers/SessionsLibraryController';
import StockLibraryController from '../controllers/StockLibraryController';
import imageUpload from '@shared/middlewares/imageUpload';

const librariesRouter = Router();

const librariesController = new LibrariesController();
const stockLibraryController = new StockLibraryController();
const sessionsLibraryController = new SessionsLibraryController();

librariesRouter.post(
	'/',
	imageUpload.single('image'),
	librariesController.create,
);

librariesRouter.get('/', librariesController.list);

librariesRouter.post('/stock', stockLibraryController.create);
librariesRouter.get('/stock', stockLibraryController.list);

librariesRouter.post('/sessions', sessionsLibraryController.create);

export default librariesRouter;
