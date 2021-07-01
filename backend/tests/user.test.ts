import request from 'supertest';
import app from '../src/app';
import { UserModel } from '../src/models';
import 'jest-extended';
import { connectToMemoryDatabase, createTestUser, getUserJWT } from './utils';
import { closeConnectionToDatabase } from '../src/db';

describe('User', () => {
  let adminJWTToken: string;

  beforeAll(async () => {
    await connectToMemoryDatabase();
    const adminUser = await createTestUser('admin');
    adminJWTToken = await getUserJWT(adminUser);
  });

  test('Creating user', async () => {
    const user = {
      username: 'Thinger',
      firstName: 'Dolly',
      lastName: 'Gardner',
    };

    const response = await request(app).post('/api/user').send(user).set('Authorization', adminJWTToken);
    expect(response.status).toBe(200);
    expect(response.body).toContainEntries([
      ['username', user.username],
      ['role', 'user'],
      ['firstName', user.firstName],
      ['lastName', user.lastName],
    ]);
  });

  test('Updating user', async () => {
    const user = await UserModel.findOne({});

    expect(user).not.toBeNull();

    const userJWTToken = await getUserJWT(user!);

    const newData = {
      avatar: 'https://picsum.photos/200',
      greetingVideo: 'dolly_gardner.mp4',
    };

    const response = await request(app)
      .patch(`/api/user/${user!.id}`)
      .send(newData)
      .set('Authorization', userJWTToken);

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({});

    const updatedUser = await UserModel.findById(user!.id);

    expect(updatedUser).not.toBeNull();
    expect(updatedUser!.avatar).toBe(newData.avatar);
    expect(updatedUser!.greetingVideo).toBe(newData.greetingVideo);
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
  });
});
