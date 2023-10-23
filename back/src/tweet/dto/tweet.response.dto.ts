import { Prop } from "@nestjs/mongoose";
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { User } from "src/users/entities/user.entity";

export class TweetResponseDto {
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

   @Prop({ type: ()  => [User], default: [] })
   tweet_user: User[];
}
