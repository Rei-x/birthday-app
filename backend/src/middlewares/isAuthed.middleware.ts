import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

interface TokenInterface {
  user?: string;
}

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(token, config.SECRET, (_err, decoded: TokenInterface | undefined) => {
    if (decoded) {
      res.locals.user = decoded.user;
      next();
    } else {
      res.sendStatus(401);
    }
  });
};

export default validateToken;
