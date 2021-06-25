import request from 'supertest';
import app from '../src/app';
import 'jest-extended';

describe('Authentication', () => {
  let token: string;

  test('Test creating jwt token', async () => {
    const response = await request(app)
      .get('/api/getToken')
      .send({ login: 'testUser' });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
    const [header] = response.body.token.split('.');
    expect(header).toBe('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
    token = response.body.token;
  });
  test('Test too short username', async () => {
    const response = await request(app)
      .get('/api/getToken')
      .send({ login: 'xd' });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors[0].location).toBe('body');
    expect(response.body.errors[0].param).toBe('login');
  });
  test('Logging in', async () => {
    const response = await request(app)
      .get('/isLogged')
      .set('Authorization', token);
    expect(response.status).toBe(200);
    expect(response.body?.user).toBe('testUser');
  });
});
