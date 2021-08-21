import request from 'supertest';
import app from '../src/app';
import { generateJWTForTests, mockFetch } from './utils';

jest.mock('node-fetch');

jest.setTimeout(1000000);

describe('Poll', () => {
  let adminJWT: string;

  beforeAll(async () => {
    adminJWT = await generateJWTForTests('admin');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Listing poll results', async () => {
    const expectedResponse = {
      ResultCount: 1,
      Data: [
        {
          user: '60e9bf6cfecade2b846b6bdb',
          question1: 'yes',
        },
      ],
    };

    mockFetch(expectedResponse);

    const response = await request(app)
      .get('/api/survey/result')
      .set('Authorization', adminJWT);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(expectedResponse);
  });

  test('Getting user poll result', async () => {
    const userId = '60e9bf6cfecade2b846b6bdb';
    const userJWT = await generateJWTForTests('user', userId);

    const valueToMock = {
      ResultCount: 2,
      Data: [
        {
          user: userId,
          question1: 'yes',
        },
        {
          user: 'dog',
          question1: 'no',
        },
      ],
    };

    const expectedResponse = {
      ResultCount: 1,
      Data: [valueToMock.Data[0]],
    };

    mockFetch(valueToMock);

    const response = await request(app)
      .get(`/api/survey/result/${userId}`)
      .set('Authorization', userJWT);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(expectedResponse);
  });
});
