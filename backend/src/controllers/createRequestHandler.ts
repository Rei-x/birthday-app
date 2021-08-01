import { Result, ValidationChain } from 'express-validator';
import { RequestHandler } from 'express';
import { Middleware } from 'express-validator/src/base';
import { checkValidation } from '../middlewares';

interface RequestHandlerInterface {
  middlewares?: Array<RequestHandler>;
  validators?:
    | Array<ValidationChain>
    | ValidationChain
    | (Middleware & {
        run: (req: Request) => Promise<Result<any>>;
      });
}

const createRequestHandler = (
  callback: RequestHandler,
  options: RequestHandlerInterface
): Array<RequestHandler> => {
  const ArrayOfRequestHandlers: Array<RequestHandler> = [];

  const { validators, middlewares } = options;

  if (validators) {
    if (Array.isArray(validators)) ArrayOfRequestHandlers.push(...validators);
    else ArrayOfRequestHandlers.push(validators);
    ArrayOfRequestHandlers.push(checkValidation);
  }

  if (middlewares) ArrayOfRequestHandlers.push(...middlewares);

  ArrayOfRequestHandlers.push(callback);

  return ArrayOfRequestHandlers;
};

export default createRequestHandler;
