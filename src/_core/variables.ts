import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      expandVariables: true,
      validationSchema: Joi.object({
        // CORE PARAMS
        APP_PORT: Joi.string().required(),
        // DATABASE
        APP_DB_HOST: Joi.string().required(),
        APP_DB_PORT: Joi.string().required(),
        APP_DB_DATABASE: Joi.string().required(),
        APP_DB_SCHEMA: Joi.string().required(),
        APP_DB_USER: Joi.string().required(),
        APP_DB_PASSWORD: Joi.string().required(),
        // JWT
        APP_BCRYPT_SALT_ROUNDS: Joi.number().required(),
        APP_JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        APP_JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        APP_JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        APP_JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
  ],
  exports: [ConfigModule],
})
export class AppVariablesModule {}
