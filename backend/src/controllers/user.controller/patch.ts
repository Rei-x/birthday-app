import { body, ValidationChain } from 'express-validator';
import { UserModel } from '../../models';
import { isImage, isVideo } from '../../validators';
import createRequestHandler from '../createRequestHandler';

const createUserValidator: ValidationChain[] = [
  body('username').isString().isLength({ min: 3 }).optional(),
  body('firstName').isString().isLength({ min: 3 }).optional(),
  body('lastName').isString().isLength({ min: 3 }).optional(),
];

const patch = createRequestHandler(async (req, res) => {
  const { userId } = req.params;
  const {
    username, firstName, lastName, role,
  } = req.body;
  const { avatar, video } = (req.files as unknown as {
    [fieldname: string]: Express.Multer.File[]; });

  await UserModel.findByIdAndUpdate(userId, {
    username, firstName, lastName, role, avatar: avatar[0].path, video: video[0].path,
  });

  res.sendStatus(200);
}, {
  validators: [...createUserValidator,
    body('avatar').custom(isImage({ optional: true })),
    body('video').custom(isVideo({ optional: true })),
    body('role').isIn(['admin', 'user']).withMessage('Role must be user or admin').optional(),
  ],
});

export default patch;
