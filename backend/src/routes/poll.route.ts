import { Router } from 'express';
import { pollController } from '../controllers';
import { isAuthed } from '../middlewares';

const router = Router();

router.get('/poll', isAuthed('admin'), pollController.list);
router.get('/poll/:userId', isAuthed(), pollController.one);

export default router;
