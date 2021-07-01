import { Router } from 'express';
import { adminController } from '../controllers';

const router = Router();

router.post('/admin/login', adminController.post);

export default router;
