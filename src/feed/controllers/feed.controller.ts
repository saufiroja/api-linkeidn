import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { User } from 'src/auth/models/user.entity';

import { createFeedDto } from '../dto/create.feed.dto';
import { GetFeedFilterDto } from '../dto/get-filter.dto';
import { Feed } from '../models/feed.entity';
import { FeedInterface } from '../models/feed.interface';
import { FeedService } from '../service/feed.service';

@Controller('feed')
@UseGuards(AuthGuard())
export class FeedController {
  constructor(private feedService: FeedService) {}

  // Get All Posts
  @Get()
  getAllPosts(
    @Query() filterDto: GetFeedFilterDto,
    @GetUser() user: User,
  ): Promise<Feed[]> {
    return this.feedService.getAllPosts(filterDto, user);
  }

  // Gett Post By Id
  @Get(':id')
  getPostById(@Param('id') id: string, @GetUser() user: User): Promise<Feed> {
    return this.feedService.getPostById(id, user);
  }

  // create post
  @Post()
  createPost(
    @Body() createfeedDto: createFeedDto,
    @GetUser() user: User,
  ): Promise<Feed> {
    return this.feedService.createPost(createfeedDto, user);
  }

  // update post
  @Put(':id')
  updatePost(
    @Param('id') id: string,
    @Body() body: FeedInterface,
    @GetUser() user: User,
  ): Promise<Feed> {
    return this.feedService.updatePost(id, body, user);
  }

  // delete post
  @Delete(':id')
  deletePost(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.feedService.deletePost(id, user);
  }
}
