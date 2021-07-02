import { body, oneOf, ValidationChain } from 'express-validator';
import { UserModel } from '../../models';
import createRequestHandler from '../createRequestHandler';

const createUserValidator: ValidationChain[] = [
  body('username').isString().isLength({ min: 3 }),
  body('firstName').isString().isLength({ min: 3 }),
  body('lastName').isString().isLength({ min: 3 }),
];

const patch = createRequestHandler(async (req, res) => {
  const { userId } = req.params;
  const {
    username, firstName, lastName, avatar, greetingVideo, role,
  } = req.body;

  await UserModel.findByIdAndUpdate(userId, {
    username, firstName, lastName, avatar, greetingVideo, role,
  });

  res.sendStatus(200);
}, oneOf([...createUserValidator,
  body('avatar').isURL(),
  body('greetingVideo').isString(),
  body('role').isIn(['admin', 'user']).withMessage('Role must be user or admin'),
]));

export default patch;
