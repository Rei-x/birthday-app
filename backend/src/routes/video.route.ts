import { Router } from 'express';
import { videoController } from '../controllers';
import { isAuthed } from '../middlewares';

const router = Router();

router.get('/video/:userId', isAuthed(), videoController.get);

export default router;
