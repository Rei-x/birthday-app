import request from 'supertest';
import app from '../src/app';
import { closeConnectionToDatabase } from '../src/db';
import { UserInterface } from '../src/models';
import { connectToMemoryDatabase, createTestUser } from './utils';
import 'jest-extended';

describe('Admin', () => {
  let user: UserInterface;
  const password = '1234';
  beforeAll(async () => {
    await connectToMemoryDatabase();
    user = await createTestUser({ role: 'admin', password });
  });
  test('Logging in', async () => {
    const loginData = {
      username: user.username,
      password,
    };

    const response = await request(app)
      .post('/api/admin/login')
      .send(loginData);
    expect(response.status).toBe(200);
    expect(response.body.JWT).toBeString();
  });
  afterAll(async () => {
    await closeConnectionToDatabase();
  });
});
