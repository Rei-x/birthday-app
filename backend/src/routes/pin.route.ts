import { Router } from 'express';
import { pinController } from '../controllers';

const router = Router();

router.post('/pin', pinController.post);

export default router;
