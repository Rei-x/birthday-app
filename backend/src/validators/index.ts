import { CustomValidator } from 'express-validator';

interface IsImageParameters {
  req: any,
  path: string
}

interface IsImageOptions {
  optional?: boolean
}

const checkMimetypeInRequestFile = (
  filename: string, files: Array<Express.Multer.File[]>, mimetypes: Array<string>,
): boolean => {
  const file = files[filename as any][0];
  if (mimetypes.includes(file.mimetype)) return true;
  return false;
};

// eslint-disable-next-line import/prefer-default-export
export const isImage = ({
  optional,
}: IsImageOptions = { optional: false }): CustomValidator => (
  _value: any, { req, path }: IsImageParameters,
) => {
  if (req.files[path]) return checkMimetypeInRequestFile(path, req.files, ['image/png', 'image/jpeg']);
  return optional;
};

export const isVideo = ({
  optional,
}: IsImageOptions = { optional: false }): CustomValidator => (
  _value: any, { req, path }: IsImageParameters,
) => {
  if (req.files[path]) return checkMimetypeInRequestFile(path, req.files, ['video/mp4']);
  return optional;
};
