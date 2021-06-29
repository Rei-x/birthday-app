import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { body, param } from 'express-validator';
import crypto from 'crypto';
import { TokenModel, UserModel } from '../models';
import config from '../config';
import createRequestHandler from './createRequestHandler';

const post = createRequestHandler(async (req: Request, res: Response) => {
  const { userId } = req.body;
  const user = await UserModel.findById(userId);
  if (!user) return res.sendStatus(404);

  const hash = crypto.randomBytes(20).toString('hex');
  await TokenModel.create({
    token: hash,
    user: user._id,
  });
  return res.json({ token: hash });
}, [body('userId')
  .isString()
  .withMessage('User ID must be a string')
  .isLength({ min: 4 })
  .withMessage('User ID must be longer than 4 characters')]);

const get = createRequestHandler(async (req: Request, res: Response) => {
  const { tokenId } = req.params;
  const tokenData = await TokenModel.find({ token: tokenId, isActive: true }, { limit: 1 }).populate('user').exec();

  if (tokenData.length !== 1) return res.status(404).json({ error: 'Token doesn\'t exist' });
  return new Promise((resolve) => {
    jwt.sign({
      id: tokenData[0].user.id,
      role: tokenData[0].user.role,
    }, config.SECRET, async (err: Error | null, encoded: string | undefined) => {
      if (encoded) {
        res.json({ JWT: `Bearer ${encoded}` });
      } else {
        res.status(500).json(err);
      }
      resolve();
    });
  });
}, param('tokenId').exists().withMessage('You must specify Token ID as url param'));

export default { post, get };
