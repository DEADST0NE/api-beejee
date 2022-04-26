import { CookieOptions } from 'express';

import { getMiliSeconds } from './helpers';

export const cookieConfig: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  expires: new Date(
    new Date().valueOf() +
      getMiliSeconds(process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME),
  ),
};

export const enableCorsUrls = ['http://localhost:3000'];
