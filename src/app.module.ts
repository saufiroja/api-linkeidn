import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeOrmConfig } from './config/typeorm.config';
import { FeedModule } from './feed/feed.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), FeedModule],
})
export class AppModule {}
