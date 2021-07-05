import { Request, Response } from 'express';
import { getOffsetFromPage, paginationOptions } from '../../db';
import { UserModel } from '../../models';

const list = async (req: Request, res: Response) => {
  const { page } = req.query;

  const offset = getOffsetFromPage(<string>page || 1);

  try {
    const users = await UserModel.paginate({}, { ...paginationOptions, offset });
    res.json(users);
  } catch (e) {
    res.sendStatus(500);
  }
};

export default list;
