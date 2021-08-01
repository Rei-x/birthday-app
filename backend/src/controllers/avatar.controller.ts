import { param } from 'express-validator';
import { UserModel } from '../models';
import createRequestHandler from './createRequestHandler';

const get = createRequestHandler(
  async (req, res) => {
    const { username } = req.params;

    const user = await UserModel.findOne({ username });

    if (!user || !user.avatar) {
      res.sendStatus(404);
      return;
    }

    res.sendFile(user.avatar);
  },
  {
    validators: param('username').isString(),
  }
);

export default { get };
