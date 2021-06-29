import express from 'express';
import { userController } from '../controllers';

// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/user', userController.post);
router.patch('/user/:userId', userController.patch);
export default router;
