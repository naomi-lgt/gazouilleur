import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Comment {
  /**
   * L'auteur du commentaire'
   * @example "@beyonce"
   */
   @IsString()
   @IsNotEmpty()
  @Prop({ required: true })
  author: string;

  /**
   * La date du commentaire'
   * @example "2023-01-03T15:05:08.382Z"
   */
  @IsDateString()
  @Prop({ default: () => new Date().getTime() })
  date: string;

  /**
   * Le contenu du commentaire'
   * @example "Amazing"
   */
   @IsString()
   @IsNotEmpty()
  @Prop({ required: true })
  content: string;
}

export type CommentDocument = HydratedDocument<Comment>;
export const CommentSchema = SchemaFactory.createForClass(Comment);
