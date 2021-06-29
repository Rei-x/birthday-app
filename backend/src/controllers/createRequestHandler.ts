import { Result, ValidationChain } from 'express-validator';
import { RequestHandler } from 'express';
import { Middleware } from 'express-validator/src/base';
import { checkValidation } from '../middlewares';

const createRequestHandler = (
  callback: RequestHandler, validators?: Array<ValidationChain> | ValidationChain | Middleware & {
    run: (req: Request) => Promise<Result>;
  },
): Array<RequestHandler> => {
  if (validators) {
    if (Array.isArray(validators)) return [...validators, checkValidation, callback];
    return [validators, checkValidation, callback];
  }
  return [callback];
};

export default createRequestHandler;
