import { Body, Controller, Post } from '@nestjs/common';
import { createFeedDto } from '../dto/create.feed.dto';
import { Feed } from '../models/feed.entity';
import { FeedService } from '../service/feed.service';

@Controller('feed')
export class FeedController {
  constructor(private feedService: FeedService) {}

  //   create post
  @Post()
  createPost(@Body() createfeedDto: createFeedDto): Promise<Feed> {
    return this.feedService.createPost(createfeedDto);
  }
}
