import request from 'supertest';
import app from '../src/app';
import { closeConnectionToDatabase } from '../src/db';
import { UserInterface } from '../src/models';
import { connectToMemoryDatabase, createTestUser, getUserJWT } from './utils';

describe('Video', () => {
  let user: UserInterface;
  let JWTToken: string;

  beforeAll(async () => {
    await connectToMemoryDatabase();
    user = await createTestUser();
    JWTToken = await getUserJWT(user);
  });

  test('Get video', async () => {
    if (!user) throw new Error("User doesn't exist");

    await user.updateOne({ video: 'tests/static/test.mp4' });

    const response = await request(app)
      .get(`/api/video/${user.id}`)
      .set('Authorization', JWTToken);

    expect(response.status).toBe(200);
  });

  test('Check if video exists', async () => {
    const validResponse = await request(app)
      .head(`/api/video/${user.id}`)
      .set('Authorization', JWTToken);

    expect(validResponse.status).toBe(200);

    user.video = null as any;
    await user.save();

    const badResponse = await request(app)
      .head(`/api/video/${user.id}`)
      .set('Authorization', JWTToken);

    expect(badResponse.status).toBe(404);
  });

  afterAll(async () => {
    await closeConnectionToDatabase();
  });
});
