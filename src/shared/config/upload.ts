import crypto from 'crypto';

import multer from 'multer';
import path from 'path';

const destination = path.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads');

export default {
	destination,

	storage: multer.diskStorage({
		destination,
		filename(request, file, callback) {
			const hash = crypto.randomBytes(10).toString('hex');
			const fileName = `${hash}-${file.originalname}`;

			return callback(null, fileName);
		},
	}),
};
