import { Router } from 'express';
import { userController } from '../controllers';

const router = Router();

router.post('/user', userController.post);
router.patch('/user/:userId', userController.patch);
export default router;
