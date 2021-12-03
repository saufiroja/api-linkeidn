import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/models/user.entity';

import { createFeedDto } from '../dto/create.feed.dto';
import { GetFeedFilterDto } from '../dto/get-filter.dto';
import { Feed } from '../models/feed.entity';
import { FeedInterface } from '../models/feed.interface';
import { FeedRepository } from '../repository/feed.repository';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(FeedRepository)
    private readonly feedRepository: FeedRepository,
  ) {}

  // get all posts
  async getAllPosts(filterDto: GetFeedFilterDto, user: User): Promise<Feed[]> {
    return await this.feedRepository.getFeed(filterDto, user);
  }

  // get post by id
  async getPostById(id: string, user: User): Promise<Feed> {
    const postById = await this.feedRepository.findOne({
      where: {
        id,
        user,
      },
    });

    if (!postById) {
      throw new NotFoundException(`Feed with ID "${id}" not found`);
    }

    return postById;
  }

  // create post
  createPost(createFeedDto: createFeedDto, user: User): Promise<Feed> {
    return this.feedRepository.createPost(createFeedDto, user);
  }

  // update post
  async updatePost(
    id: string,
    feedInterface: FeedInterface,
    user: User,
  ): Promise<Feed> {
    const { body } = feedInterface;
    const post = await this.getPostById(id, user);
    post.body = body;
    await this.feedRepository.save(post);
    return post;
  }

  // delete post
  async deletePost(id: string, user: User): Promise<void> {
    const result = await this.feedRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(`Feed with ID "${id}" not found`);
    }
  }
}
