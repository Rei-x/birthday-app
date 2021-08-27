import request from 'supertest';
import rimraf from 'rimraf';
import app from '../src/app';
import { UserInterface, UserModel } from '../src/models';
import 'jest-extended';
import { connectToMemoryDatabase, createTestUser } from './utils';
import { closeConnectionToDatabase } from '../src/db';
import config from '../src/config';
import { generateJWT } from '../src/utils';

describe('User', () => {
  let adminJWTToken: string;
  let userJWTToken: string;
  let user: UserInterface;

  beforeAll(async () => {
    await connectToMemoryDatabase();
    const adminUser = await createTestUser({
      username: 'adminUser',
      role: 'admin',
    });
    adminJWTToken = await generateJWT(adminUser);
    user = await createTestUser({
      username: 'normalUser',
    });
    userJWTToken = await generateJWT(user);
  });

  jest.setTimeout(10000);
  test('Creating user', async () => {
    const userData = {
      username: 'Thinger',
      firstName: 'Dolly',
      lastName: 'Gardner',
    };

    const response = await request(app)
      .post('/api/user')
      .field('username', userData.username)
      .field('firstName', userData.firstName)
      .field('lastName', userData.lastName)
      .set('Authorization', adminJWTToken)
      .attach('avatar', 'tests/static/test.jpg')
      .attach('video', 'tests/static/test.mp4');

    expect(response.status).toBe(200);
    expect(response.body).toContainEntries([
      ['username', userData.username],
      ['role', 'user'],
      ['firstName', userData.firstName],
      ['lastName', userData.lastName],
    ]);
  });

  test('Getting one user', async () => {
    const response = await request(app)
      .get(`/api/user/${user.id}`)
      .set('Authorization', userJWTToken);
    expect(response.status).toBe(200);
    expect(response.body).toContainEntries([
      ['username', user.username],
      ['role', user.role],
      ['firstName', user.firstName],
      ['lastName', user.lastName],
    ]);
    expect(response.body).not.toContainKeys(['avatar', 'video']);
  });

  test('Listing users with adminJWT', async () => {
    const response = await request(app)
      .get('/api/user')
      .set('Authorization', adminJWTToken);
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
      'nextPage',
    ]);
  });

  test('Listing users with userJWT should include only username, first name and last name', async () => {
    const response = await request(app)
      .get('/api/user')
      .set('Authorization', userJWTToken);
    expect(response.status).toBe(200);
    expect(response.body.docs[0]).toContainAllKeys([
      'username',
      'firstName',
      'lastName',
      'hasConfirmedAttendance',
    ]);
  });

  test('Updating user', async () => {
    const response = await request(app)
      .patch(`/api/user/${user!.id}`)
      .attach('avatar', 'tests/static/test.jpg')
      .attach('video', 'tests/static/test.mp4')
      .set('Authorization', adminJWTToken);

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({});

    const updatedUser = await UserModel.findById(user!.id);

    expect(updatedUser).not.toBeNull();
    expect(updatedUser!.avatar).not.toBe(user!.avatar);
    expect(updatedUser!.video).not.toBe(user!.video);
    expect(updatedUser!.username).toBe(user!.username);
    expect(updatedUser!.firstName).toBe(user!.firstName);
    expect(updatedUser!.lastName).toBe(user!.lastName);
  });

  test('Deleting user', async () => {
    const response = await request(app)
      .delete(`/api/user/${user._id}`)
      .set('Authorization', adminJWTToken);

    const emptyUser = await UserModel.findById(user._id);

    expect(emptyUser).toBeNull();
    expect(response.status).toBe(200);
  });

  test('Failing when trying to update other user without permission', async () => {
    const firstUser = await UserModel.findOne();

    expect(firstUser).not.toBeNull();

    const secondUser = await createTestUser();
    const secondUserJWTToken = await generateJWT(secondUser);

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
    rimraf.sync(config.UPLOAD_PATH);
  });
});
