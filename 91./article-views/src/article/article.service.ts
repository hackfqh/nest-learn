import { Inject, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { EntityManager } from 'typeorm';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class ArticleService {
  @InjectEntityManager()
  private entityManager: EntityManager;

  @Inject(RedisService)
  private redisService: RedisService;

  async findOne(id: number) {
    return await this.entityManager.findOneBy(Article, {
      id,
    });
  }

  async view(id: number, userId: string) {
    console.log(userId, '---获取到的 userId-----');
    const res = await this.redisService.hashGet(`article_${id}`);

    if (res.viewCount === undefined) {
      const article = await this.findOne(id);

      article.viewCount++;

      await this.entityManager.update(
        Article,
        { id },
        {
          viewCount: article.viewCount,
        },
      );

      await this.redisService.hashSet(`article_${id}`, {
        viewCount: article.viewCount,
        likeCount: article.likeCount,
        collectCount: article.collectCount,
      });

      await this.redisService.set(`user_${userId}_article_${id}`, 1, 300);

      return article.viewCount;
    } else {
      const flag = await this.redisService.get(`user_${userId}_article_${id}`);
      console.log(flag, '---flag-----');
      if (flag) {
        return res.viewCount;
      }

      await this.redisService.hashSet(`article_${id}`, {
        ...res,
        viewCount: +res.viewCount + 1,
      });
      console.log('----会执行到这儿吗');
      await this.redisService.set(`user_${userId}_article_${id}`, 1, 300);
      return +res.viewCount + 1;
    }
  }

  async flushRedisToDB() {
    const keys = await this.redisService.keys(`article_*`);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      const res = await this.redisService.hashGet(key);

      const [, id] = key.split('_');

      await this.entityManager.update(
        Article,
        {
          id: +id,
        },
        {
          viewCount: +res.viewCount,
        },
      );
    }
  }
}
