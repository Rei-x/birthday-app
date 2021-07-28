import request from 'supertest';
import app from '../src/app';
import { TokenModel, UserInterface } from '../src/models';
import { closeConnectionToDatabase } from '../src/db';
import { connectToMemoryDatabase, createTestUser, getUserJWT } from './utils';
import 'jest-extended';

describe('Token', () => {
  let adminUser: UserInterface;
  let adminJWTToken: string;

  beforeAll(async () => {
    await connectToMemoryDatabase();
    adminUser = await createTestUser({ username: 'adminUser', role: 'admin' });
    adminJWTToken = await getUserJWT(adminUser);
  });

  test('Creating token', async () => {
    const response = await request(app)
      .post('/api/redeemToken')
      .send({ userId: adminUser.id })
      .set('Authorization', adminJWTToken);

    expect(response.status).toBe(200);
    expect(response.body?.token).not.toBeNull();
  });

  test('Returns 401 when there is no token in headers', async () => {
    const response = await request(app)
      .post('/api/redeemToken')
      .send({ userId: adminUser.id });

    expect(response.status).toBe(401);
    expect(response.body?.token).toBeUndefined();
  });

  test('Returns 401 when token is invalid', async () => {
    const response = await request(app)
      .post('/api/redeemToken')
      .send({ userId: adminUser.id })
      .set('Authorization', 'Bearer b4dT0k3n');

    expect(response.status).toBe(401);
    expect(response.body?.token).toBeUndefined();
  });

  test('Returns 403 with normal user JWT', async () => {
    const normalUser = await createTestUser();
    const normalUserJWTToken = await getUserJWT(normalUser);

    const response = await request(app)
      .post('/api/redeemToken')
      .send({ userId: adminUser.id })
      .set('Authorization', normalUserJWTToken);

    expect(response.status).toBe(403);
    expect(response.body?.token).toBeUndefined();
  });

  test('Redeem token', async () => {
    const tokenData = await TokenModel.findOne();

    expect(tokenData).not.toBeNull();

    const response = await request(app).get(
      `/api/redeemToken/${tokenData!.token}`
    );

    expect(response.status).toBe(200);
    expect(response.body.pin).toBeWithin(100000, 999999);
  });

  afterAll(async () => {
    await closeConnectionToDatabase();
  });
});
