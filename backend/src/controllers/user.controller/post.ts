import { Request, Response } from 'express';
import { checkSchema, ParamSchema } from 'express-validator';
import { UserModel } from '../../models';
import createRequestHandler from '../createRequestHandler';

const stringSchema = (stringName: string): ParamSchema => ({
  in: 'body',
  errorMessage: `${stringName} is wrong`,
  isString: true,
  isLength: {
    errorMessage: `${stringName} should be at least 3 chars long`,
    options: { min: 3 },
  },
});

const post = createRequestHandler(async (req: Request, res: Response) => {
  const { username, firstName, lastName } = req.body;

  const user = await UserModel.create({ username, firstName, lastName });

  res.json(user);
}, checkSchema({
  username: stringSchema('Username'),
  firstName: stringSchema('First name'),
  lastName: stringSchema('Last name'),
}));

export default post;
