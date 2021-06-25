/* eslint-disable import/prefer-default-export */
import { ValidationChain } from 'express-validator';
import { checkValidation } from '../middlewares';

const createValidator = (validators: Array<ValidationChain> | ValidationChain) => {
  if (Array.isArray(validators)) return [...validators, checkValidation];
  return [validators, checkValidation];
};

export { createValidator };
