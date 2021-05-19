/** @format */

import multer from 'multer';

import uploadConfig from '../config/upload';

const imageUpload = multer({
	dest: uploadConfig.destination,
	storage: uploadConfig.storage,
});

export default imageUpload;
