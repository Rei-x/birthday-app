import { body, ValidationChain } from 'express-validator';
import 'multer';
import { UserModel } from '../../models';
import { isImage, isVideo } from '../../validators';
import createRequestHandler from '../createRequestHandler';

const createUserValidator: ValidationChain[] = [
  body('username').isString().isLength({ min: 3 }).optional(),
  body('firstName').isString().isLength({ min: 3 }).optional(),
  body('lastName').isString().isLength({ min: 3 }).optional(),
  body('hasConfirmedAttendance').isString().isLength({ min: 3 }).optional(),
];

const deleteUndefinedValuesFromObject = (obj: Record<string, any>) => {
  const objectCopy = { ...obj };
  Object.keys(objectCopy).forEach((key) => {
    if (objectCopy[key] === undefined) {
      delete objectCopy[key];
    }
  });
  return objectCopy;
};

const patch = createRequestHandler(
  async (req, res) => {
    const { userId } = req.params;
    const {
      username,
      firstName,
      lastName,
      hasConfirmedAttendance,
      hasCompletedPoll,
    } = req.body;
    const { avatar, video } = req.files as unknown as {
      [fieldname: string]: Express.Multer.File[];
    };

    let avatarFilePath;
    let videoFilePath;
    if (Array.isArray(avatar)) avatarFilePath = avatar[0].path;
    if (Array.isArray(video)) videoFilePath = video[0].path;

    const newData: Record<string, any> = {
      username,
      firstName,
      lastName,
      hasConfirmedAttendance,
      hasCompletedPoll,
      avatar: avatarFilePath,
      video: videoFilePath,
    };

    const parsedData = deleteUndefinedValuesFromObject(newData);

    await UserModel.findByIdAndUpdate(userId, parsedData);

    res.sendStatus(200);
  },
  {
    validators: [
      ...createUserValidator,
      body('avatar').custom(isImage({ optional: true })),
      body('video').custom(isVideo({ optional: true })),
      body('role')
        .isIn(['admin', 'user'])
        .withMessage('Role must be user or admin')
        .optional(),
    ],
  }
);

export default patch;
