import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWTInterface } from '../interfaces';
import config from '../config';

const onlyAdminFields = ['role', 'greetingVideo'];

const onlyAdminFieldsAreInRequest = (req: Request): boolean => {
  let result: boolean = false;
  onlyAdminFields.every((field: string) => {
    if (field in req.body) {
      result = true;
      return false;
    }
    return true;
  });
  return result;
};

// eslint-disable-next-line max-len
const userRequestsHisUserId = (req: Request, res: Response): boolean => req.params.userId === res.locals.user.id;

const userHasPermission = (req: Request, res: Response, requiredRole: 'admin' | 'user'): boolean => {
  if (res.locals.user.role === 'admin') return true;
  if (res.locals.user.role === 'user' && requiredRole === 'admin') return false;
  if (onlyAdminFieldsAreInRequest(req)) return false;
  if (userRequestsHisUserId(req, res)) return true;
  return false;
};

const validateToken = (requiredRole: 'admin' | 'user' = 'user') => (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(token, config.SECRET, (_err, decoded: JWTInterface | undefined) => {
    if (!decoded) {
      res.sendStatus(401);
      return;
    }

    res.locals.user = decoded;

    if (userHasPermission(req, res, requiredRole)) {
      next();
    } else {
      res.sendStatus(403);
    }
  });
};

export default validateToken;
