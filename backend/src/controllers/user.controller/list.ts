import { Request, Response } from 'express';
import { getOffsetFromPage, paginationOptions } from '../../db';
import { UserModel } from '../../models';

const list = async (req: Request, res: Response) => {
  const { page } = req.query;

  const { role } = res.locals.user;

  const offset = getOffsetFromPage(<string>page || 1);

  const userOptions = { select: 'username firstName lastName -_id' };
  const adminOptions = {};
  const additionalOptions = role === 'admin' ? adminOptions : userOptions;

  try {
    const users = await UserModel.paginate(
      {},
      {
        ...paginationOptions,
        offset,
        ...additionalOptions,
      }
    );
    res.json(users);
  } catch (e) {
    res.sendStatus(500);
  }
};

export default list;
