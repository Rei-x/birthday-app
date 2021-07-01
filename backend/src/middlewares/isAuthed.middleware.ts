import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWTInterface } from '../interfaces';
import config from '../config';

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

    const { role, userId } = decoded;
    res.locals.user = decoded;

    if ((requiredRole === 'user') || (requiredRole === 'admin' && requiredRole === role)) {
      const requestedUserId = req.params.userId;
      if (!requestedUserId) {
        next();
        return;
      }
      if (role === 'user' && userId !== requestedUserId) {
        res.sendStatus(403);
        return;
      }
      next();
      return;
    }
    res.sendStatus(401);
  });
};

export default validateToken;
