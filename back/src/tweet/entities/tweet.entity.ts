import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { HydratedDocument, ObjectId, Types } from 'mongoose';
import { Comment } from './comment.entity';

@Schema()
export class Tweet {
  /**
   * L'auteur du gazouilli'
   * @example "@ladygaga"
   */
  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  author: string;

  /**
   * La date du gazouilli'
   * @example "2023-01-03T15:05:08.382Z"
   */
  @IsDateString()
  @Prop({ default: () => new Date().getTime() })
  date: Date;

  /**
   * Le contenu du gazouilli'
   * @example "Rah rah ra-a-ah"
   */
  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  content: string;

  /**
   * Le nombre de j'aimes du gazouilli'
   * @example 678245
   */
  @IsNumber()
  @IsOptional()
  @Prop({ default: 0 })
  likes?: number;

  /**
   * Les commentaires du gazouilli'
   * @example "["trop bien","j'adore"]"
   */
  @IsOptional()
  @Prop({ type: ()  => [Comment], default: [] })
  comments?: Comment[];

  constructor(author: string, date: Date, content: string, likes?: number, comments?: Comment[]) {
    this.author = author;
    this.date = date;
    this.content = content;
    this.likes = likes;
    this.comments = comments;
  }
}

export type TweetDocument = HydratedDocument<Tweet>;
export const TweetSchema = SchemaFactory.createForClass(Tweet);
