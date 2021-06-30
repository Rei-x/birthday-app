import { Request, Response } from 'express';
import { param } from 'express-validator';
import fs from 'fs';
import { UserModel } from '../models';
import createRequestHandler from './createRequestHandler';

const get = createRequestHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await UserModel.findById(userId);

  if (!user?.greetingVideo) {
    res.sendStatus(404);
    return;
  }

  const path = 'videos';
  const videoPath = `${path}/${user.greetingVideo}`;

  fs.stat(videoPath, (err, stat) => {
    if (err !== null && err.code === 'ENOENT') {
      res.sendStatus(404);
      return;
    }

    const fileSize = stat.size;
    const { range } = req.headers;

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');

      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(videoPath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      };

      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      };

      res.writeHead(200, head);
      fs.createReadStream(videoPath).pipe(res);
    }
  });
}, param('userId').isString().withMessage("UserId wasn't declared"));

export default { get };
