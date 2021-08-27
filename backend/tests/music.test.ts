import request from 'supertest';
import app from '../src/app';
import { closeConnectionToDatabase } from '../src/db';
import { MusicURLModel } from '../src/models';
import { connectToMemoryDatabase, generateJWTForTests } from './utils';

describe('Music', () => {
  let userJWT: string;
  let adminJWT: string;

  beforeAll(async () => {
    await connectToMemoryDatabase();
    userJWT = await generateJWTForTests();
    adminJWT = await generateJWTForTests('admin');
  });

  afterEach(async () => {
    await MusicURLModel.deleteMany({});
  });

  afterAll(async () => {
    await closeConnectionToDatabase();
  });

  test('Get returns one url', async () => {
    const musicURL = {
      url: 'https://google.com/123456?qwerty=asdfgh',
    };

    await MusicURLModel.create(musicURL);
    const response = await request(app)
      .get('/api/music')
      .set('Authorization', userJWT);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(musicURL);
  });

  test('Post creates musicURL', async () => {
    const musicURL = {
      url: 'https://google.com/123456?qwerty=asdfgh',
    };

    const response = await request(app)
      .post('/api/music')
      .set('Authorization', adminJWT)
      .send(musicURL);

    expect(response.status).toBe(201);
    const fetchedObject = await MusicURLModel.findOne({
      url: musicURL.url,
      isActive: true,
    });
    expect(fetchedObject).not.toBeUndefined();
  });
});
