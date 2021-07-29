import { Router } from 'express';
import { avatarController } from '../controllers';

const router = Router();

router.get('/avatar/:username', avatarController.get);

export default router;
