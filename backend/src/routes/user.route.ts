import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import mkdirp from 'mkdirp';
import randomstring from 'randomstring';
import { userController } from '../controllers';
import { isAuthed } from '../middlewares';
import config from '../config';

const router = Router();

mkdirp.sync(config.UPLOAD_PATH);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, config.UPLOAD_PATH);
  },
  filename: (_req, file, cb) => {
    cb(
      null,
      `${randomstring.generate()}.${Date.now()}${path.extname(
        file.originalname
      )}`
    );
  },
});

const uploadSettings = multer({ storage }).fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'video', maxCount: 1 },
]);

router.get('/user', isAuthed(), userController.list);
router.get('/user/:userId', isAuthed(), userController.one);
router.post('/user', isAuthed('admin'), uploadSettings, userController.post);
router.patch('/user/:userId', isAuthed(), uploadSettings, userController.patch);
router.delete('/user/:userId', isAuthed('admin'), userController.remove);

export default router;
