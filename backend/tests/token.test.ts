import request from 'supertest';
import app from '../src/app';
import { TokenModel, UserModel } from '../src/models';
import { closeConnectionToDatabase } from '../src/db';
import { connectToMemoryDatabase, createTestUser } from './utils';
import 'jest-extended';

describe('Token', () => {
  beforeAll(async () => {
    await connectToMemoryDatabase();
    await createTestUser();
  });
  test('Creating token', async () => {
    const user = await UserModel.findOne();
    expect(user).not.toBeNull();
    const response = await request(app).post('/api/redeemToken').send({ userId: user!.id });
    expect(response.status).toBe(200);
    expect(response.body?.token).not.toBeNull();
  });
  test('Redeem token', async () => {
    const tokenData = await TokenModel.findOne();
    expect(tokenData).not.toBeNull();
    const response = await request(app).get(`/api/redeemToken/${tokenData!.token}`);
    expect(response.status).toBe(200);
    expect(response.body.JWT).toBeString();
  });
  afterAll(async () => {
    await closeConnectionToDatabase();
  });
});
