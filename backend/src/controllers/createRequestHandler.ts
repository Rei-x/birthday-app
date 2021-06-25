import { ValidationChain } from 'express-validator';
import { RequestHandler } from 'express';
import { checkValidation } from '../middlewares';

const createRequestHandler = (
  callback: RequestHandler, validators?: Array<ValidationChain> | ValidationChain,
): Array<RequestHandler> => {
  if (validators) {
    if (Array.isArray(validators)) return [...validators, checkValidation, callback];
    return [validators, checkValidation, callback];
  }
  return [callback];
};

export default createRequestHandler;
