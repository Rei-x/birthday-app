import { Router } from 'express';
import { vodkaController } from '../controllers';

const router = Router();

router.get('/vodka-poll', vodkaController.get);

export default router;
