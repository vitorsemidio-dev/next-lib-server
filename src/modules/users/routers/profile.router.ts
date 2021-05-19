/** @format */

import { Router } from 'express';

import ProfileController from '../controllers/ProfileController';
import ensureAuthenticated from '@shared/middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);
profileRouter.get('/', profileController.show);

export default profileRouter;
