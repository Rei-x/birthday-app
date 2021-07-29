/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';
import { ValidationChain } from 'express-validator';
import config from '../config';
import { checkValidation } from '../middlewares';
import { UserInterface } from '../models';
import { JWTInterface } from '../interfaces';

const createValidator = (
  validators: Array<ValidationChain> | ValidationChain
) => {
  if (Array.isArray(validators)) return [...validators, checkValidation];
  return [validators, checkValidation];
};

const generateJWT = async (user: UserInterface): Promise<string> =>
  new Promise((resolve, reject) => {
    jwt.sign(
      <JWTInterface>{
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      config.SECRET,
      async (err: Error | null, encoded: string | undefined) => {
        if (encoded) {
          resolve(`Bearer ${encoded}`);
        }
        reject(err);
      }
    );
  });

export { createValidator, generateJWT };
