import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { applyGlobalConfiguration } from 'src/main';
import { TweetService } from 'src/tweet/tweet.service';
import * as request from 'supertest';

describe('TweetController (e2e)', () => {
  let app: INestApplication;
  let tweetService: TweetService;
  let moduleFixture: TestingModule;

  beforeEach(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    applyGlobalConfiguration(app);
    tweetService = app.get(TweetService);
    await app.init();
  });

  describe('GET', () => {
    it('should response all tweets when GET', async () => {
      const tweets = await tweetService.findAll();
      const response = await request(app.getHttpServer()).get('/api/tweets');
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toEqual(tweets.length);
    });
  });

  describe('POST', () => {
    it('should return a 401 if not logged when POST a new tweet', async () => {
      const newTweet = {
        content: 'Hello',
      };
      const response = await request(app.getHttpServer())
        .post('/api/tweets')
        .send(newTweet);
      expect(response.statusCode).toBe(401);
    });
  });

  afterAll(async () => {
    await app.close();
    await moduleFixture.close();
  });
});
