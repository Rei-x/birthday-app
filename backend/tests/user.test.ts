import request from 'supertest';
import rimraf from 'rimraf';
import app from '../src/app';
import { UserModel } from '../src/models';
import 'jest-extended';
import { connectToMemoryDatabase, createTestUser, getUserJWT } from './utils';
import { closeConnectionToDatabase } from '../src/db';

describe('User', () => {
  let adminJWTToken: string;

  beforeAll(async () => {
    await connectToMemoryDatabase();
    const adminUser = await createTestUser({ username: 'adminUser', role: 'admin' });
    adminJWTToken = await getUserJWT(adminUser);
  });

  jest.setTimeout(10000);
  test('Creating user', async () => {
    const user = {
      username: 'Thinger',
      firstName: 'Dolly',
      lastName: 'Gardner',
    };

    const response = await request(app)
      .post('/api/user')
      .field('username', user.username)
      .field('firstName', user.firstName)
      .field('lastName', user.lastName)
      .set('Authorization', adminJWTToken)
      .attach('avatar', 'tests/static/test.jpg')
      .attach('video', 'tests/static/test.mp4');

    expect(response.status).toBe(200);
    expect(response.body).toContainEntries([
      ['username', user.username],
      ['role', 'user'],
      ['firstName', user.firstName],
      ['lastName', user.lastName],
    ]);
  });

  test('Getting one user', async () => {
    const user = await UserModel.findOne();

    expect(user).not.toBeUndefined();

    const response = await request(app).get(`/api/user/${user!.id}`).set('Authorization', adminJWTToken);
    expect(response.status).toBe(200);
    expect(response.body).toContainEntries([
      ['username', user!.username],
      ['role', user!.role],
      ['firstName', user!.firstName],
      ['lastName', user!.lastName],
    ]);
  });

  test('Listing users', async () => {
    const response = await request(app).get('/api/user').set('Authorization', adminJWTToken);
    expect(response.status).toBe(200);
    expect(response.body).toContainAllKeys([
      'docs',
      'totalDocs',
      'offset',
      'limit',
      'totalPages',
      'page',
      'pagingCounter',
      'hasPrevPage',
      'hasNextPage',
      'prevPage',
      'nextPage']);
  });

  test('Updating user', async () => {
    const user = await UserModel.findOne({});

    expect(user).not.toBeNull();

    const userJWTToken = await getUserJWT(user!);

    const response = await request(app)
      .patch(`/api/user/${user!.id}`)
      .attach('avatar', 'tests/static/test.jpg')
      .attach('video', 'tests/static/test.mp4')
      .set('Authorization', userJWTToken);

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({});

    const updatedUser = await UserModel.findById(user!.id);

    expect(updatedUser).not.toBeNull();
    expect(updatedUser!.avatar).not.toBe(user!.avatar);
    expect(updatedUser!.video).not.toBe(user!.video);
  });

  test('Failing when trying to update other user without permission', async () => {
    const firstUser = await UserModel.findOne();

    expect(firstUser).not.toBeNull();

    const secondUser = await createTestUser();
    const secondUserJWTToken = await getUserJWT(secondUser);

    const newData = {
      firstName: 'Luigi',
    };

    const response = await request(app)
      .patch(`/api/user/${firstUser!.id}`)
      .send(newData)
      .set('Authorization', secondUserJWTToken);

    expect(response.status).toBe(403);

    const updatedUser = await UserModel.findById(firstUser!.id);

    expect(updatedUser).not.toBeNull();
    expect(updatedUser!.firstName).toBe(firstUser!.firstName);
  });

  afterAll(async () => {
    await closeConnectionToDatabase();
    rimraf.sync('uploads');
  });
});
