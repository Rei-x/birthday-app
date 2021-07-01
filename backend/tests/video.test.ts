import request from 'supertest';
import app from '../src/app';
import { closeConnectionToDatabase } from '../src/db';
import { UserInterface } from '../src/models';
import { connectToMemoryDatabase, createTestUser, getUserJWT } from './utils';

describe('Video', () => {
  let user: UserInterface;
  beforeAll(async () => {
    await connectToMemoryDatabase();
    user = await createTestUser();
  });
  test('Get video', async () => {
    if (!user) throw new Error('User doesn\'t exist');
    const authHeader = await getUserJWT(user);
    await user.updateOne({ greetingVideo: 'video.mp4' });
    const response = await request(app).get(`/api/video/${user.id}`).set('Authorization', authHeader);
    expect(response.status).toBe(200);
  });
  afterAll(async () => {
    await closeConnectionToDatabase();
  });
});
