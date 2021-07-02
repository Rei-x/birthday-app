import jwt from 'jsonwebtoken';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MongoMemoryServer } from 'mongodb-memory-server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '../../src/db';
import { UserInterface, UserModel } from '../../src/models';
import { JWTInterface } from '../../src/interfaces';
import config from '../../src/config';

export const connectToMemoryDatabase = async () => {
  const mongod = new MongoMemoryServer();
  const url = await mongod.getUri();
  await connectToDatabase(url);
};

interface TestUserInterface{
  username?: string,
  firstName?: string,
  lastName?: string,
  role?: 'user' | 'admin',
  password?: string
}

export const createTestUser = async (testUser?: TestUserInterface) => {
  let passwordHash;
  const password = testUser?.password;

  if (password && testUser?.role === 'user') throw new Error('Only admins can log in using password');
  if (password) passwordHash = await bcrypt.hash((password as string), 5);

  const userData = {
    username: 'johnwalles',
    firstName: 'John',
    lastName: 'Walles',
    role: 'user',
    ...testUser,
    password: undefined,
    passwordHash,
  };

  return UserModel.create(userData);
};

export const getUserJWT = async (user: UserInterface): Promise<string> => new Promise((resolve) => {
  jwt.sign(<JWTInterface>{
    userId: user.id,
    role: user.role,
  }, config.SECRET, (_err, encoded) => {
    resolve(`Bearer ${encoded}`);
  });
});
