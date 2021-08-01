import { body } from 'express-validator';
import { PinModel } from '../models';
import { generateJWT } from '../utils';
import createRequestHandler from './createRequestHandler';

const post = createRequestHandler(
  async (req, res) => {
    const { pin } = req.body;

    const pinData = await PinModel.findOne({ pin }).populate('user').exec();

    if (!pinData) {
      res.sendStatus(404);
      return;
    }

    const JWT = await generateJWT(pinData.user);
    res.json({ JWT });
  },
  {
    validators: body('pin').custom((value) => {
      if (value >= 100000 && value <= 999999) return true;
      return false;
    }),
  }
);

export default { post };
