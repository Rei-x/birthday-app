import { param } from 'express-validator';
import { UserModel } from '../../models';
import createRequestHandler from '../createRequestHandler';

const remove = createRequestHandler(async (req, res) => {
  const { userId } = req.params;

  const result = await UserModel.findByIdAndDelete(userId);

  if (!result) res.status(400).json({ error: 'Nothing was deleted' });
  else res.sendStatus(204);
}, { validators: param('userId').isString().exists() });

export default remove;
