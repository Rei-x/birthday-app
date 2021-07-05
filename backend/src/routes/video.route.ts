import { Router } from 'express';
import { videoController } from '../controllers';

const router = Router();

router.get('/video/:userId', videoController.get);

export default router;
