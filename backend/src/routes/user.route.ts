import { Router } from 'express';
import { userController } from '../controllers';
import { isAuthed } from '../middlewares';

const router = Router();

router.get('/user', isAuthed('admin'), userController.get);
router.post('/user', isAuthed('admin'), userController.post);
router.patch('/user/:userId', isAuthed(), userController.patch);

export default router;
