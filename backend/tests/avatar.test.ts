import request from 'supertest';
import fs from 'fs';
import app from '../src/app';
import { closeConnectionToDatabase } from '../src/db';
import { UserInterface } from '../src/models';
import { connectToMemoryDatabase, createTestUser } from './utils';
import { generateJWT } from '../src/utils';

describe('Avatar', () => {
  let user: UserInterface;
  let userJWT: string;

  beforeAll(async () => {
    await connectToMemoryDatabase();
    user = await createTestUser({ role: 'user' });
    userJWT = await generateJWT(user);
  });
  test('Retrieving user avatar using username', async () => {
    const response = await request(app)
      .get(`/api/avatar/${user.username}`)
      .set('Authorization', `${userJWT}`);

    const avatarPath = user.avatar;
    const avatar = fs.readFileSync(avatarPath);
    expect(response.body).toEqual(avatar);
  });

  afterAll(async () => {
    await closeConnectionToDatabase();
  });
});
