import { Request, Response } from 'express';
import { body, param } from 'express-validator';
import crypto from 'crypto';
import { TokenModel, UserModel } from '../models';
import createRequestHandler from './createRequestHandler';
import { generateJWT } from '../utils';

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
  const tokenData = await TokenModel.findOne({ token: tokenId, isActive: true }).populate('user').exec();

  if (!tokenData) return res.sendStatus(404);

  try {
    const JWT = await generateJWT(tokenData.user);
    return res.json({ JWT });
  } catch (e) {
    return res.sendStatus(500);
  }
}, param('tokenId').exists().withMessage('You must specify Token ID as url param'));

export default { post, get };
