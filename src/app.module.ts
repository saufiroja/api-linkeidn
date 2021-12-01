import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeOrmConfig } from './config/typeorm.config';
import { FeedModule } from './feed/feed.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), FeedModule, AuthModule],
})
export class AppModule {}
