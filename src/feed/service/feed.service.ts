import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createFeedDto } from '../dto/create.feed.dto';
import { Feed } from '../models/feed.entity';

import { FeedRepository } from '../repository/feed.repository';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(FeedRepository)
    private readonly feedRepository: FeedRepository,
  ) {}

  // create feed
  createPost(createFeedDto: createFeedDto): Promise<Feed> {
    return this.feedRepository.createPost(createFeedDto);
  }
}
