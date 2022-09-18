import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { prepareTestingApp } from './prepareTestingApp';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await prepareTestingApp();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/users/ (GET) with no users', () => {
    return request(app.getHttpServer()).get('/v1/users/').expect(200);
  });

  it('/users/ (POST) a valid user', () => {
    return request(app.getHttpServer())
      .post('/v1/users/')
      .send({
        username: 'user1',
        email: 'user1@example.com',
        password: 'user1pass',
      })
      .expect(201)
      .expect({ id: 1, username: 'user1', email: 'user1@example.com' });
  });

  it('/users/1 (GET) when user exists', async () => {
    const result = await request(app.getHttpServer()).get('/v1/users/1');
    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      id: 1,
      username: 'user1',
      email: 'user1@example.com',
    });
  });

  it('/users/ (GET) with one user', async () => {
    const result = await request(app.getHttpServer()).get('/v1/users/');
    expect(result.status).toBe(200);
    expect(result.body).toEqual([
      { id: 1, username: 'user1', email: 'user1@example.com' },
    ]);
  });

  it('/users/1 (PATCH) when user exists', async () => {
    const result = await request(app.getHttpServer())
      .patch('/v1/users/1')
      .send({ username: 'user-One' });
    expect(result.status).toBe(200);
    expect(result.body).toEqual({ affected: 1, generatedMaps: [], raw: [] });
  });

  it('/users/1 (GET) after updating user', async () => {
    const result = await request(app.getHttpServer()).get('/v1/users/1');
    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      id: 1,
      username: 'user-One',
      email: 'user1@example.com',
    });
  });

  it.skip('/users/2 (GET) when user does not exist', async () => {
    const result = await request(app.getHttpServer()).get('/v1/users/2');
    expect(result.status).toBe(404);
    expect(result.body).toEqual(undefined);
  });

  it('/users/ (POST) a valid user', () => {
    return request(app.getHttpServer())
      .post('/v1/users/')
      .send({
        username: 'user2',
        email: 'user2@example.com',
        password: 'user2pass',
      })
      .expect(201)
      .expect({ id: 2, username: 'user2', email: 'user2@example.com' });
  });

  it('/users/2 (GET) after user is created', async () => {
    const result = await request(app.getHttpServer()).get('/v1/users/2');
    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      id: 2,
      username: 'user2',
      email: 'user2@example.com',
    });
  });

  it('/users/ (GET) with two users', async () => {
    const result = await request(app.getHttpServer()).get('/v1/users/');
    expect(result.status).toBe(200);
    expect(result.body).toEqual([
      { id: 1, username: 'user-One', email: 'user1@example.com' },
      { id: 2, username: 'user2', email: 'user2@example.com' },
    ]);
  });

  it('/users/ (POST) invalid username', () => {
    return request(app.getHttpServer())
      .post('/v1/users/')
      .send({
        username: 5,
        email: 'user3@example.com',
        password: 'user3pass',
      })
      .expect(400);
  });

  it('/users/ (POST) invalid email', () => {
    return request(app.getHttpServer())
      .post('/v1/users/')
      .send({
        username: 'user3',
        email: 'user3@example',
        password: 'user2pass',
      })
      .expect(400);
  });

  it('/users/ (POST) invalid password', () => {
    return request(app.getHttpServer())
      .post('/v1/users/')
      .send({
        username: 'user3',
        email: 'user3@example.com',
        password: '',
      })
      .expect(400);
  });
});
