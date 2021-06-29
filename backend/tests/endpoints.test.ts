import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../src/app';
import { TokenModel, UserInterface, UserModel } from '../src/models';
import 'jest-extended';
import { connectToDatabase } from '../src/db';

const mongod = new MongoMemoryServer();
mongod.getUri().then((url) => connectToDatabase(url));

describe('Token', () => {
  beforeAll(async () => {
    const userData = <UserInterface> { username: 'johnwalles', firstName: 'John', lastName: 'Walles' };
    return UserModel.create(userData);
  });
  test('Creating token', async () => {
    const user = await UserModel.findOne();
    expect(user).not.toBeNull();
    const response = await request(app).post('/api/redeemToken').send({ userId: user!.id });
    expect(response.status).toBe(200);
    expect(response.body?.token).not.toBeNull();
  });
  test('Redeem token', async () => {
    const tokenData = await TokenModel.findOne();
    expect(tokenData).not.toBeNull();
    const response = await request(app).get(`/api/redeemToken/${tokenData!.token}`);
    expect(response.status).toBe(200);
    expect(response.body.JWT).toBeString();
  });
});

describe('User', () => {
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
      greetingVideo: 'https://www.youtube.com/watch?v=7X8II6J-6mU',
    };
    const response = await request(app).patch(`/api/user/${id}`).send(dataToUpdate);
    expect(response.status).toBe(200);
    expect(response.body).toBe({});

    const updatedUser = await UserModel.findById(id);

    expect(updatedUser).not.toBeNull();
    expect(updatedUser!.avatar).toBe(dataToUpdate.avatar);
    expect(updatedUser!.greetingVideo).toBe(dataToUpdate.greetingVideo);
  });
});
