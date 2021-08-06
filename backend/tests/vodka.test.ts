import request from 'supertest';
import app from '../src/app';
import { UserInterface } from '../src/models';
import { connectToMemoryDatabase, createTestUser } from './utils';

describe('Vodka', () => {
  beforeAll(async () => {
    await connectToMemoryDatabase();
  });
  test('Get returns data of vodka choices', async () => {
    const vodkaChoices = [
      {
        name: 'vodka1',
        count: 3,
      },
      {
        name: 'vodka2',
        count: 1,
      },
    ];

    const usersToCreate = <Array<Promise<UserInterface>>>[];

    vodkaChoices.forEach((vodka) => {
      const { name } = vodka;
      for (let i = 0; i < vodka.count; i += 1) {
        usersToCreate.push(createTestUser({ vodkaPollChoice: name }));
      }
    });
    await Promise.all(usersToCreate);

    const response = await request(app).get('/api/vodka-poll');
    expect(response.body).toMatchObject(vodkaChoices);
  });
});
