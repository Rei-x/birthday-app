import { Router } from 'express';
import { videoController } from '../controllers';

const router = Router();

router.head('/video/:userId', videoController.head);
router.get('/video/:userId', videoController.get);

export default router;
