/* eslint-disable import/prefer-default-export */
import { Request, Response } from 'express';
import {
  body, checkSchema, oneOf, ParamSchema, ValidationChain,
} from 'express-validator';
import { UserModel } from '../models';
import createRequestHandler from './createRequestHandler';

const createUserValidator: ValidationChain[] = [
  body('username').isString().isLength({ min: 3 }),
  body('firstName').isString().isLength({ min: 3 }),
  body('lastName').isString().isLength({ min: 3 }),
];

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

const patch = createRequestHandler(async (req, res) => {
  const { userId } = req.params;
  const {
    username, firstName, lastName, avatar, greetingVideo, role,
  } = req.body;

  await UserModel.updateOne({ _id: userId }, {
    username, firstName, lastName, avatar, greetingVideo, role,
  });

  res.sendStatus(200);
}, oneOf([...createUserValidator,
  body('avatar').isURL(),
  body('greetingVideo').isURL(),
  body('role').isIn(['admin', 'user']).withMessage('Role must be user or admin'),
]));

export default { post, patch };
