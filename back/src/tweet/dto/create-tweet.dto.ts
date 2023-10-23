import { IsNotEmpty, IsString } from 'class-validator';
import { Author } from '../entities/author.entity';
import { Tweet } from '../entities/tweet.entity';

export class CreateTweetDto
  implements Omit<Tweet, 'likes' | 'comments' | 'date'>
{
  /**
   * L'auteur du gazouilli'
   * @example "@ladygaga"
   */
   @IsString()
   @IsNotEmpty()
  author: Author['username'];

  /**
   * Le contenu du gazouilli'
   * @example "Rah rah ra-a-ah"
   */
   @IsString()
   @IsNotEmpty()
  content: string;
}
