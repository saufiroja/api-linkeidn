import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { createFeedDto } from '../dto/create.feed.dto';
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
  async getAllPosts(feed: Feed): Promise<Feed[]> {
    return await this.feedRepository.find(feed);
  }

  // get post by id
  async getPostById(id: string): Promise<Feed> {
    const postById = await this.feedRepository.findOne({ id });

    if (!postById) {
      throw new NotFoundException(`Feed with ID "${id}" not found`);
    }

    return postById;
  }

  // create post
  createPost(createFeedDto: createFeedDto): Promise<Feed> {
    return this.feedRepository.createPost(createFeedDto);
  }

  // update post
  async updatePost(id: string, feedInterface: FeedInterface): Promise<Feed> {
    const { body } = feedInterface;
    const post = await this.getPostById(id);
    post.body = body;
    await this.feedRepository.save(post);
    return post;
  }

  // delete post
  async deletePost(id: string): Promise<void> {
    const result = await this.feedRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Feed with ID "${id}" not found`);
    }
  }
}
