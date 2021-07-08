import { Request, Response } from 'express';
import { checkSchema, ParamSchema } from 'express-validator';
import { UserModel } from '../../models';
import { isImage, isVideo } from '../../validators';
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

const getFilePathOrUndefined = (
  array: Express.Multer.File[] | undefined,
): string | undefined => {
  if (array === undefined) return undefined;
  return array[0].path;
};

const post = createRequestHandler(async (req: Request, res: Response) => {
  const { username, firstName, lastName } = req.body;

  const userAlreadyExists = await UserModel.exists({ username });

  if (userAlreadyExists) {
    res.status(400).json({ error: 'User already exists' });
  }

  const { avatar: avatarFile, video: videoFile } = (req.files as unknown as {
    [fieldname: string]: Express.Multer.File[]; });

  const avatar = getFilePathOrUndefined(avatarFile);
  const video = getFilePathOrUndefined(videoFile);

  const user = await UserModel.create({
    username, firstName, lastName, avatar, video,
  });

  res.json(user);
}, {
  validators: checkSchema({
    username: stringSchema('Username'),
    firstName: stringSchema('First name'),
    lastName: stringSchema('Last name'),
    avatar: {
      custom: {
        options: isImage({ optional: true }),
        errorMessage: 'File must be a png or jpeg.',
      },
    },
    video: {
      custom: {
        options: isVideo({ optional: true }),
        errorMessage: 'File must be a mp4',
      },
    },
  }),
});

export default post;
