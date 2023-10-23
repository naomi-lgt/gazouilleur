import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getEnvPath } from './envs/helper/env.helper';
import { TweetModule } from './tweet/tweet.module';
import { UsersModule } from './users/users.module';
import { CoreModule } from './core/core.module';
import { AppController } from './app.controller';

const envFilePath: string = getEnvPath(`src/envs`);

@Module({
  imports: [
    TweetModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'), // Loaded from .ENV
        dbName: config.get<string>('dbName'),
      }),
    }),
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    UsersModule,
    CoreModule,
  ],
  controllers: [AppController]
})
export class AppModule {}
