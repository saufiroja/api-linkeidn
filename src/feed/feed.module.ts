import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FeedController } from './controllers/feed.controller';
import { FeedRepository } from './repository/feed.repository';
import { FeedService } from './service/feed.service';

@Module({
  imports: [TypeOrmModule.forFeature([FeedRepository])],
  controllers: [FeedController],
  providers: [FeedService],
})
export class FeedModule {}
