import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { prepareTestingApp } from './prepareTestingApp';

describe('AuthorController (e2e)', () => {
  let app: INestApplication;
  let token1: string;
  let token2: string;

  beforeAll(async () => {
    app = await prepareTestingApp();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Prepare users', () => {
    it('should not throw', async () => {
      await request(app.getHttpServer()).post('/v1/users/').send({
        username: 'user1',
        email: 'user1@example.com',
        password: 'user1pass',
      });
      await request(app.getHttpServer()).post('/v1/users/').send({
        username: 'user2',
        email: 'user2@example.com',
        password: 'user2pass',
      });
      const response1 = request(app.getHttpServer())
        .post('/v1/auth/login')
        .send({
          username: 'user1',
          password: 'user1pass',
        });
      token1 = (await response1).body.access_token;
      const response2 = request(app.getHttpServer())
        .post('/v1/auth/login')
        .send({
          username: 'user2',
          password: 'user2pass',
        });
      token2 = (await response2).body.access_token;
    });
  });

  describe('Can create and modify authors', () => {
    it('/authors/ (POST)', async () => {
      const result = await request(app.getHttpServer())
        .post('/v1/authors/')
        .set('Authorization', 'Bearer ' + token1)
        .send({
          ownerId: 1,
          firstNames: 'Mark',
          lastName: 'Twain',
        });
      expect(result.status).toBe(201);
    });

    it('/authors/1 (PATCH)', async () => {
      const result = await request(app.getHttpServer())
        .patch('/v1/authors/1')
        .set('Authorization', 'Bearer ' + token1)
        .send({
          lastName: 'Twine',
        });
      expect(result.status).toBe(200);
    });

    it('/authors/ (GET)', async () => {
      const result = await request(app.getHttpServer())
        .get('/v1/authors/1')
        .set('Authorization', 'Bearer ' + token1);
      expect(result.status).toBe(200);
      expect(result.body.firstNames).toEqual('Mark');
      expect(result.body.lastName).toEqual('Twine');
    });
  });

  describe('Can create and modify authors as a second user', () => {
    it('/authors/ (POST)', async () => {
      const result = await request(app.getHttpServer())
        .post('/v1/authors/')
        .set('Authorization', 'Bearer ' + token2)
        .send({
          ownerId: 2,
          firstNames: 'Harper',
          lastName: 'Lee',
        });
      expect(result.status).toBe(201);
    });

    it('/authors/ (DELETE)', async () => {
      const result = await request(app.getHttpServer())
        .delete('/v1/authors/2')
        .set('Authorization', 'Bearer ' + token2);
      expect(result.status).toBe(200);
    });
  });

  describe("Cannot modify other user's authors", () => {
    it('/authors/ (PATCH) as user2', async () => {
      const result = await request(app.getHttpServer())
        .patch('/v1/authors/1')
        .set('Authorization', 'Bearer ' + token2)
        .send({
          firstNames: 'Marcus',
        });
      expect(result.status).toBe(403);
    });

    it('/authors/ (PATCH) as user1', async () => {
      const result = await request(app.getHttpServer())
        .patch('/v1/authors/2')
        .set('Authorization', 'Bearer ' + token1)
        .send({
          firstNames: 'Marcus',
        });
      expect(result.status).toBe(403);
    });

    it('/authors/ (GET)', async () => {
      const result = await request(app.getHttpServer())
        .get('/v1/authors/1')
        .set('Authorization', 'Bearer ' + token2);
      expect(result.status).toBe(200);
      expect(result.body.firstNames).toEqual('Mark');
      expect(result.body.lastName).toEqual('Twine');
    });

    it('/authors/ (DELETE)', async () => {
      const result = await request(app.getHttpServer())
        .delete('/v1/authors/1')
        .set('Authorization', 'Bearer ' + token2);
      expect(result.status).toBe(403);
    });
  });

  describe('Cannot create for another user', () => {
    it('/authors/ (POST)', async () => {
      const result = await request(app.getHttpServer())
        .post('/v1/authors/')
        .set('Authorization', 'Bearer ' + token2)
        .send({
          ownerId: 1,
          firstNames: 'James',
          lastName: 'Joyce',
        });
      expect(result.status).toBe(403);
    });
  });
});
