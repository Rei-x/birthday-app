/* eslint-disable import/prefer-default-export */
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../../config';
import validation from './validation';
import createRequestHandler from '../createRequestHandler';

const register = createRequestHandler((req: Request, res: Response) => {
  const { login } = req.body;

  jwt.sign({ user: login }, config.SECRET, (err: Error | null, encoded: string | undefined) => {
    if (encoded) res.json({ token: `Bearer ${encoded}` });
    else res.status(500).json(err);
  });
}, validation);

export default { register };
