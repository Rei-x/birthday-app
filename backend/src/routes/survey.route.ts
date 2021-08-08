import { Router } from 'express';
import { surveyController } from '../controllers';
import { isAuthed } from '../middlewares';

const router = Router();

router.get('/survey/result', isAuthed('admin'), surveyController.list);
router.get('/survey/result/:userId', isAuthed(), surveyController.one);

export default router;
