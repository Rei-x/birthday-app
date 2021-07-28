import { Request, Response } from 'express';
import { body, param } from 'express-validator';
import crypto from 'crypto';
import { TokenModel, UserModel } from '../models';
import createRequestHandler from './createRequestHandler';
import { PinModel } from '../models/pin.model';

const post = createRequestHandler(
  async (req: Request, res: Response) => {
    const { userId } = req.body;
    const user = await UserModel.findById(userId);
    if (!user) return res.sendStatus(404);

    const hash = crypto.randomBytes(20).toString('hex');
    await TokenModel.create({
      token: hash,
      user: user._id,
    });
    return res.json({ token: hash });
  },
  {
    validators: body('userId')
      .isString()
      .withMessage('User ID must be a string')
      .isLength({ min: 4 })
      .withMessage('User ID must be longer than 4 characters'),
  }
);

const get = createRequestHandler(
  async (req: Request, res: Response) => {
    const { tokenId } = req.params;
    const token = await TokenModel.findOne({ token: tokenId, isActive: true })
      .populate('user')
      .exec();

    if (!token) return res.sendStatus(404);

    const generateRandomSixDigitNumber = () =>
      Math.floor(100000 + Math.random() * 900000);

    try {
      const pin = generateRandomSixDigitNumber();

      await PinModel.create({
        pin,
        user: token.user._id,
      });

      await token.update({ isActive: false });

      return res.json({ pin });
    } catch (e) {
      console.error(e);
      return res.sendStatus(500);
    }
  },
  {
    validators: param('tokenId')
      .exists()
      .withMessage('You must specify Token ID as url param'),
  }
);

export default { post, get };
