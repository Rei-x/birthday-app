import request from 'supertest';
import app from '../src/app';
import { UserModel } from '../src/models';
import 'jest-extended';
import { connectToMemoryDatabase } from './utils';
import { closeConnectionToDatabase } from '../src/db';

describe('User', () => {
  beforeAll(async () => {
    await connectToMemoryDatabase();
  });
  test('Creating user', async () => {
    const user = {
      username: 'Thinger',
      firstName: 'Dolly',
      lastName: 'Gardner',
    };

    const response = await request(app).post('/api/user').send(user);
    expect(response.status).toBe(200);
    expect(response.body).toContainEntries([
      ['username', user.username],
      ['role', 'user'],
      ['firstName', user.firstName],
      ['lastName', user.lastName],
    ]);
  });
  test('Updating user', async () => {
    const [{ id }] = await UserModel.find({});

    const dataToUpdate = {
      avatar: 'https://picsum.photos/200',
      greetingVideo: 'dolly_gardner.mp4',
    };
    const response = await request(app).patch(`/api/user/${id}`).send(dataToUpdate);
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({});

    const updatedUser = await UserModel.findById(id);

    expect(updatedUser).not.toBeNull();
    expect(updatedUser!.avatar).toBe(dataToUpdate.avatar);
    expect(updatedUser!.greetingVideo).toBe(dataToUpdate.greetingVideo);
  });
  afterAll(async () => {
    await closeConnectionToDatabase();
  });
});
