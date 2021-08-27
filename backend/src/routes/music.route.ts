import { Router } from 'express';
import { musicController } from '../controllers';
import { isAuthed } from '../middlewares';

const router = Router();

router.get('/music', isAuthed(), musicController.get);
router.post('/music', isAuthed("admin"), musicController.post);

export default router;
