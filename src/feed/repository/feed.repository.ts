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

    const query = await this.createQueryBuilder('task');
    query.where({ user });

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }

  // create post
  async createPost(createFeedDto: createFeedDto, user: User): Promise<Feed> {
    const { body } = createFeedDto;

    const feed = await this.create({ body, user });

    await this.save(feed);
    return feed;
  }
}
