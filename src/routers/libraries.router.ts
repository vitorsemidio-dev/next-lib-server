/** @format */

import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import LibrariesController from '../controllers/LibrariesController';

const librariesRouter = Router();
const upload = multer({
	dest: uploadConfig.destination,
	storage: uploadConfig.storage,
});

const librariesController = new LibrariesController();

librariesRouter.post('/', upload.single('avatar'), librariesController.create);

export default librariesRouter;
