import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { createFeedDto } from '../dto/create.feed.dto';
import { Feed } from '../models/feed.entity';
import { FeedService } from '../service/feed.service';

@Controller('feed')
export class FeedController {
  constructor(private feedService: FeedService) {}

  // Get All Posts
  @Get()
  getAllPosts(feed: Feed): Promise<Feed[]> {
    return this.feedService.getAllPosts(feed);
  }

  // Gett Post By Id
  @Get(':id')
  getPostById(@Param('id') id: string): Promise<Feed> {
    return this.feedService.getPostById(id);
  }

  // create post
  @Post()
  createPost(@Body() createfeedDto: createFeedDto): Promise<Feed> {
    return this.feedService.createPost(createfeedDto);
  }
}
