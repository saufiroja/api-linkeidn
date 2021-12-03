import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

import { FeedController } from './controllers/feed.controller';
import { FeedRepository } from './repository/feed.repository';
import { FeedService } from './service/feed.service';

@Module({
  imports: [TypeOrmModule.forFeature([FeedRepository]), AuthModule],
  controllers: [FeedController],
  providers: [FeedService],
})
export class FeedModule {}
