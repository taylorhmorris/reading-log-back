import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { prepareTestingApp } from './prepareTestingApp';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    app = await prepareTestingApp();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
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

  it('authenticate', async () => {
    const response = request(app.getHttpServer()).post('/v1/auth/login').send({
      username: 'user1',
      password: 'user1pass',
    });
    token = (await response).body.access_token;
  });

  it('/users/1 (GET) when user exists', async () => {
    const result = await request(app.getHttpServer())
      .get('/v1/users/1')
      .set('Authorization', 'Bearer ' + token);
    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      id: 1,
      username: 'user1',
      email: 'user1@example.com',
    });
  });

  it('/users/ (GET) with one user', async () => {
    const result = await request(app.getHttpServer())
      .get('/v1/users/')
      .set('Authorization', 'Bearer ' + token);
    expect(result.status).toBe(200);
    expect(result.body).toEqual([
      { id: 1, username: 'user1', email: 'user1@example.com' },
    ]);
  });

  it('/users/1 (PATCH) when user exists', async () => {
    const result = await request(app.getHttpServer())
      .patch('/v1/users/1')
      .set('Authorization', 'Bearer ' + token)
      .send({ username: 'user-One' });
    expect(result.status).toBe(200);
    expect(result.body).toEqual({ affected: 1, generatedMaps: [], raw: [] });
  });

  it('/users/1 (PATCH) isAdmin', async () => {
    const result = await request(app.getHttpServer())
      .patch('/v1/users/1')
      .set('Authorization', 'Bearer ' + token)
      .send({ isAdmin: true });
    expect(result.status).toBe(403);
  });

  it('/users/1 (GET) after updating user', async () => {
    const result = await request(app.getHttpServer())
      .get('/v1/users/1')
      .set('Authorization', 'Bearer ' + token);
    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      id: 1,
      username: 'user-One',
      email: 'user1@example.com',
    });
  });

  it.skip('/users/2 (GET) when user does not exist', async () => {
    const result = await request(app.getHttpServer())
      .get('/v1/users/2')
      .set('Authorization', 'Bearer ' + token);
    expect(result.status).toBe(404);
    expect(result.body).toEqual(undefined);
  });

  it('/users/ (POST) a valid user', () => {
    return request(app.getHttpServer())
      .post('/v1/users/')
      .set('Authorization', 'Bearer ' + token)
      .send({
        username: 'user2',
        email: 'user2@example.com',
        password: 'user2pass',
      })
      .expect(201)
      .expect({ id: 2, username: 'user2', email: 'user2@example.com' });
  });

  it('/users/2 (GET) after user is created', async () => {
    const result = await request(app.getHttpServer())
      .get('/v1/users/2')
      .set('Authorization', 'Bearer ' + token);
    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      id: 2,
      username: 'user2',
      email: 'user2@example.com',
    });
  });

  it('/users/ (GET) with two users', async () => {
    const result = await request(app.getHttpServer())
      .get('/v1/users/')
      .set('Authorization', 'Bearer ' + token);
    expect(result.status).toBe(200);
    expect(result.body).toEqual([
      { id: 1, username: 'user-One', email: 'user1@example.com' },
      { id: 2, username: 'user2', email: 'user2@example.com' },
    ]);
  });

  it('/users/ (POST) invalid username', () => {
    return request(app.getHttpServer())
      .post('/v1/users/')
      .set('Authorization', 'Bearer ' + token)
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
      .set('Authorization', 'Bearer ' + token)
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
      .set('Authorization', 'Bearer ' + token)
      .send({
        username: 'user3',
        email: 'user3@example.com',
        password: '',
      })
      .expect(400);
  });

  it('/users/2 (DELETE) should be forbidden', () => {
    return request(app.getHttpServer())
      .delete('/v1/users/2')
      .set('Authorization', 'Bearer ' + token)
      .expect(403);
  });

  it('/users/1 (DELETE) should return success', () => {
    return request(app.getHttpServer())
      .delete('/v1/users/1')
      .set('Authorization', 'Bearer ' + token)
      .expect(200);
  });
});
