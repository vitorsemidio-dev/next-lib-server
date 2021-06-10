import { Router } from 'express';

import SessionsLibraryController from '@modules/libraries/controllers/SessionsLibraryController';

const sessionsLibraryController = new SessionsLibraryController();

const sessionsRouter = Router();

sessionsRouter.post('/sessions', sessionsLibraryController.create);

export default sessionsRouter;
