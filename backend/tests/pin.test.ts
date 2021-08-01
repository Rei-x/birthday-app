import request from 'supertest';
import app from '../src/app';
import { closeConnectionToDatabase } from '../src/db';
import { PinModel, UserInterface } from '../src/models';
import { connectToMemoryDatabase, createTestUser } from './utils';
import 'jest-extended';

describe('Pin', () => {
  let user: UserInterface;

  beforeAll(async () => {
    await connectToMemoryDatabase();
    user = await createTestUser();
  });

  test('Redeeming pin for token', async () => {
    const pinNumber = 603043;
    await PinModel.create({ pin: pinNumber, user: user._id });

    const response = await request(app)
      .post('/api/pin')
      .send({ pin: pinNumber });
    expect(response.status).toBe(200);
    expect(response.body.JWT).toBeString();
  });

  afterAll(async () => {
    await closeConnectionToDatabase();
  });
});
