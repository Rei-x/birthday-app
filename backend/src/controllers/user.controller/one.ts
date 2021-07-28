import { Request, Response } from 'express';
import { param } from 'express-validator';
import { UserModel } from '../../models';
import createRequestHandler from '../createRequestHandler';

const one = createRequestHandler(
  async (req: Request, res: Response) => {
    const { userId } = req.params;

    const user = await UserModel.findById(userId);

    if (!user) {
      res.sendStatus(404);
      return;
    }

    res.json(user);
  },
  {
    validators: param('userId')
      .exists()
      .withMessage('You must specify user id'),
  }
);

export default one;
