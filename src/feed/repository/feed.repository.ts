import { User } from 'src/auth/models/user.entity';
import { EntityRepository, Repository } from 'typeorm';

import { createFeedDto } from '../dto/create.feed.dto';
import { GetFeedFilterDto } from '../dto/get-filter.dto';
import { Feed } from '../models/feed.entity';

@EntityRepository(Feed)
export class FeedRepository extends Repository<Feed> {
  // get feed
  async getFeed(filterDto: GetFeedFilterDto, user: User): Promise<Feed[]> {
    const { search } = filterDto;

    const query = await this.createQueryBuilder('feed');
    query.where({ user });

    if (search) {
      query.andWhere(
        '(LOWER(feed.title) LIKE LOWER(:search) OR LOWER(feed.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    const feeds = await query.getMany();
    return feeds;
  }

  // create post
  async createPost(createFeedDto: createFeedDto, user: User): Promise<Feed> {
    const { body } = createFeedDto;

    const feed = await this.create({ body, user });

    await this.save(feed);
    return feed;
  }
}
