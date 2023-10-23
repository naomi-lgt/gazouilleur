import { IsNotEmpty, IsString } from 'class-validator';
import { Author } from '../entities/author.entity';
import { Comment } from '../entities/comment.entity';

export class CreateCommentDto
  implements Omit<Comment, 'date'>
{
  /**
   * L'auteur du commentaire'
   * @example "@beyonce"
   */
   @IsString()
   @IsNotEmpty()
  author: Author['username'];

  /**
   * Le contenu du commentaire'
   * @example "Amazing !"
   */
   @IsString()
   @IsNotEmpty()
  content: string;
}
