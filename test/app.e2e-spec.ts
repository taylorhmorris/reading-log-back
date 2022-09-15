import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { prepareTestingApp } from './prepareTestingApp';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await prepareTestingApp();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(404);
  });
});
