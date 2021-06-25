import express from 'express';
import { userController } from '../controllers';

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/getToken', userController.register);
export default router;
