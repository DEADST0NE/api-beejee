import request from 'supertest';
import { Test } from '@nestjs/testing';
import cookieParser from 'cookie-parser';

import { AuthModule } from '../auth.module';

import { INestApplication } from '@nestjs/common';

describe('Auth', () => {
  let app: INestApplication;

  const requestsData = {
    auth: {
      accessToken: '',
      cookie: [],
    },
    signIn: {
      message: "Welcome to PureFI Dashboard!\nYou are logging in.\nIt's free!",
      signature:
        '0x08632f8ba3f880392ce467af902bfc2d14df767b21253570e084cbe6d88510a7729031b3cdb28fd5e8526899d8388f2dfeadfb004b31f256aaab569b2058432d1c',
    },
  };

  const rexRefreshToken = new RegExp('refreshToken=(.+?);', 'g');
  const rexSessionId = new RegExp('sessionId=(.+?);', 'g');

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    app = moduleRef.createNestApplication();

    app.use(cookieParser());
    await app.init();
  });

  it('/POST signIn', async () => {
    const Result = await request(app.getHttpServer())
      .post('/auth/signin')
      .send(requestsData.signIn);

    expect(Result.status).toBe(201);
    expect(Result.headers['content-type']).toContain('json');

    requestsData.auth.accessToken = Result.body.accessToken;
    requestsData.auth.cookie = Result.headers['set-cookie'];
    expect(Result.headers['set-cookie'][0]).toMatch(rexRefreshToken);
    expect(Result.headers['set-cookie'][1]).toMatch(rexSessionId);
    expect(typeof Result.body.accessToken).toContain('string');

    return Result;
  });

  it('/POST refresh 401', async () => {
    const Result = await request(app.getHttpServer())
      .post('/auth/refresh')
      .send();

    expect(Result.status).toBe(401);

    return Result;
  });

  it('/POST refresh', async () => {
    const Result = await request(app.getHttpServer())
      .post('/auth/refresh')
      .set('Cookie', requestsData.auth.cookie)
      .send();

    expect(Result.status).toBe(201);
    expect(Result.headers['content-type']).toContain('json');

    requestsData.auth.accessToken = Result.body.accessToken;
    requestsData.auth.cookie = Result.headers['set-cookie'];

    expect(Result.headers['set-cookie'][0]).toMatch(rexRefreshToken);
    expect(Result.headers['set-cookie'][1]).toMatch(rexSessionId);
    expect(typeof Result.body.accessToken).toContain('string');

    return Result;
  });

  it('POST logout', async () => {
    const Result = await request(app.getHttpServer())
      .post('/auth/logout')
      .set('Cookie', requestsData.auth.cookie)
      .send();

    expect(Result.status).toBe(204);
    expect(Result.headers['set-cookie'][0]).toMatch(/refreshToken=;/g);
    expect(Result.headers['set-cookie'][1]).toMatch(/sessionId=;/g);
  });

  afterAll(async () => {
    await app.close();
  });
});
