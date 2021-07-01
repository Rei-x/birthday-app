import jwt from 'jsonwebtoken';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connectToDatabase } from '../../src/db';
import { UserInterface, UserModel } from '../../src/models';
import { JWTInterface } from '../../src/interfaces';
import config from '../../src/config';

export const connectToMemoryDatabase = async () => {
  const mongod = new MongoMemoryServer();
  const url = await mongod.getUri();
  await connectToDatabase(url);
};

export const createTestUser = async () => {
  const userData = <UserInterface>{ username: 'johnwalles', firstName: 'John', lastName: 'Walles' };
  return UserModel.create(userData);
};

export const getUserJWT = async (user: UserInterface): Promise<string> => new Promise((resolve) => {
  jwt.sign(<JWTInterface>{
    userId: user.id,
    role: 'user',
  }, config.SECRET, (_err, encoded) => {
    resolve(`Bearer ${encoded}`);
  });
});
