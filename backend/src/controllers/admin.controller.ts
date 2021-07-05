import { body } from 'express-validator';
import bcrypt from 'bcryptjs';
import { UserModel } from '../models';
import createRequestHandler from './createRequestHandler';
import { generateJWT } from '../utils';

const post = createRequestHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username }, 'passwordHash role');

  if (!user?.passwordHash) {
    res.sendStatus(404);
    return;
  }

  const match = await bcrypt.compare(password, user!.passwordHash!);

  if (match) {
    try {
      const JWT = await generateJWT(user!);
      res.json({ JWT });
    } catch (e) {
      res.sendStatus(500);
    }
    return;
  }
  res.sendStatus(403);
}, [body('username').isString(), body('password').isString()]);

export default { post };
