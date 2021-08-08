// eslint-disable-next-line import/no-extraneous-dependencies
import { MongoMemoryServer } from 'mongodb-memory-server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fetch, { Response } from 'node-fetch';
import { connectToDatabase } from '../../src/db';
import { UserInterface, UserModel } from '../../src/models';
import config from '../../src/config';

export const connectToMemoryDatabase = async () => {
  const mongod = new MongoMemoryServer();
  await mongod.start();
  const url = mongod.getUri();
  await connectToDatabase(url);
};

export const createTestUser = async (
  testUser?: Partial<UserInterface & { password: string }>
) => {
  let passwordHash;
  const password = testUser?.password;

  if (password && testUser?.role === 'user')
    throw new Error('Only admins can log in using password');
  if (password) passwordHash = await bcrypt.hash(password as string, 5);

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

export const generateJWTForTests = async (
  role: 'admin' | 'user' = 'user',
  userId?: string
): Promise<string> =>
  new Promise((resolve, reject) =>
    jwt.sign(
      {
        id: userId,
        role,
      },
      config.SECRET,
      async (err: Error | null, encoded: string | undefined) => {
        if (encoded) {
          resolve(`Bearer ${encoded}`);
        }
        reject(err);
      }
    )
  );

export const mockFetch = (expectedResponse: any) =>
  (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue({
    json: async () => expectedResponse,
  } as Response);
