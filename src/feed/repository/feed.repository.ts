import { EntityRepository, Repository } from 'typeorm';

import { createFeedDto } from '../dto/create.feed.dto';
import { Feed } from '../models/feed.entity';

@EntityRepository(Feed)
export class FeedRepository extends Repository<Feed> {
  // create post
  async createPost(createFeedDto: createFeedDto): Promise<Feed> {
    const { body } = createFeedDto;

    const feed = await this.create({ body });

    await this.save(feed);
    return feed;
  }
}
