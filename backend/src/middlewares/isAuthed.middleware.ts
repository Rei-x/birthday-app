import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

interface JWTInterface {
  userId?: string;
  role?: string
}

const validateToken = (role: 'admin' | 'user' = 'user') => (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.sendStatus(401);
    return;
  }
  jwt.verify(token, config.SECRET, (_err, decoded: JWTInterface | undefined) => {
    if ((decoded && role === 'user') || (decoded && role === 'admin' && role === decoded.role)) {
      res.locals.user = decoded;
      next();
    } else {
      res.sendStatus(401);
    }
  });
};

export default validateToken;
