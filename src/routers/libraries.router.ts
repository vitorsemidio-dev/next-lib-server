/** @format */

import { Router } from 'express';

import LibrariesController from '../controllers/LibrariesController';
import imageUpload from '../middlewares/imageUpload';

const librariesRouter = Router();

const librariesController = new LibrariesController();

librariesRouter.post(
	'/',
	imageUpload.single('image'),
	librariesController.create,
);

librariesRouter.get('/', librariesController.list);

export default librariesRouter;
