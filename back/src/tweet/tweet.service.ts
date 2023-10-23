import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { TweetResponseDto } from './dto/tweet.response.dto';
import { Tweet, TweetDocument } from './entities/tweet.entity';

@Injectable()
export class TweetService {
  constructor(
    @InjectModel(Tweet.name) private tweetModel: Model<TweetDocument>,
  ) {}

  create(createTweetDto: CreateTweetDto) {
    return this.tweetModel.create(createTweetDto);
  }

  // async findUserInfo(request = '') {
  //   // console.log(request.user)
  //   try {
  //     return request
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  //   // return request
  // }

  async findAll(): Promise<TweetResponseDto[]> {
    try {
      return await this.tweetModel.aggregate(
        [
          {
            $lookup:
              {
                from: "users",
                localField: "author",
                foreignField: "username",
                as: "tweet_user"
              }
          }
        ]
      ).exec();
    } catch (err) {
      throw new Error(err);
    }
  }

  async findCommentsInfo(id: ObjectId): Promise<TweetResponseDto[]> {
    try {
      const idToFetch = new Types.ObjectId(id as unknown as string)
      const response =  await this.tweetModel.aggregate(
        [
          {
            $match: {
              _id: idToFetch
            }
          },
          {
            $lookup:
              {
                from: "users",
                localField: "comments.author",
                foreignField: "username",
                as: "tweet_user"
              },
          }
        ]
      ).exec();
        console.log(response);
      if(response.length > 0) return response[0]
      else throw new Error
    } catch (err) {
      throw new Error(err);
    }
  }

  async findOne(id: ObjectId): Promise<TweetResponseDto> {
    try {
      const idToFetch = new Types.ObjectId(id as unknown as string)
      const response =  await this.tweetModel.aggregate(
        [
          {
            $match: {
              _id: idToFetch
            }
          },
          {
            $lookup:
              {
                from: "users",
                localField: "author",
                foreignField: "username",
                as: "tweet_user"
              },
          }
        ]
      ).exec();
        console.log(response);
      if(response.length > 0) return response[0]
      else throw new Error
    } catch (err) {
      throw new Error(err);
    }
  }

  // update(id: ObjectId, updateTweetDto: UpdateTweetDto) {
  //   return `This action updates a #${id} tweet`;
  // }

  async addComment(id: ObjectId, createCommentDto: CreateCommentDto) {
    const foundTweet = await this.findOne(id);
    const newComments = [...foundTweet.comments, createCommentDto]
    const response = await this.tweetModel.findOneAndUpdate(
      { "_id": id },
      {
        "$set": {
          "comments": newComments
        }
      },
      {
        new: true,
      }
      )
    return response
  }

  remove(id: ObjectId) {
    return `This action removes a #${id} tweet`;
  }
}
