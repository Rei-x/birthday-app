import { Request, Response } from 'express';
import { UserModel } from '../models';

const get = async (_req: Request, res: Response) => {
  const vodkaData = await UserModel.aggregate([
    {
      '$match': {
        'vodkaPollChoice': {
          '$ne': 'idk'
        }
      }
    }, {
      '$group': {
        '_id': '$vodkaPollChoice', 
        'name': {
          '$first': '$vodkaPollChoice'
        }, 
        'count': {
          '$sum': 1
        }
      }
    }, {
      '$project': {
        '_id': 0
      }
    }, {
      '$sort': {
        'count': -1
      }
    }
  ]);
  res.json(vodkaData);
};

export default { get };
