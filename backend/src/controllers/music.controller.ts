import { Request, Response } from 'express';
import { body } from 'express-validator';
import { MusicURLModel } from '../models';
import createRequestHandler from './createRequestHandler';

const get = async (_req: Request, res: Response) => {
  const musicURL = await MusicURLModel.findOne({ isActive: true }, 'url');

  if (!musicURL) {
    res.sendStatus(404);
    return;
  }

  res.json(musicURL);
};

const post = createRequestHandler(
  async (req: Request, res: Response) => {
    const { url } = req.body;
    await MusicURLModel.updateMany({ isActive: true }, { isActive: false });
    await MusicURLModel.create({
      url,
    });
    res.sendStatus(201);
  },
  {
    validators: body('url').isURL(),
  }
);
export default { get, post };
