/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';
import { ValidationChain } from 'express-validator';
import config from '../config';
import { checkValidation } from '../middlewares';
import { UserInterface } from '../models';

const createValidator = (validators: Array<ValidationChain> | ValidationChain) => {
  if (Array.isArray(validators)) return [...validators, checkValidation];
  return [validators, checkValidation];
};

const generateJWT = async (
  user: UserInterface,
): Promise<string> => new Promise((resolve, reject) => {
  jwt.sign({
    id: user.id,
    role: user.role,
  }, config.SECRET, async (err: Error | null, encoded: string | undefined) => {
    if (encoded) {
      resolve(`Bearer ${encoded}`);
    }
    reject(err);
  });
});

export { createValidator, generateJWT };
