import { Prop } from "@nestjs/mongoose";
import { IsArray, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { User } from "../entities/user.entity";

export class CreateUserDto implements Omit<User, 'avatar' | 'description' | 'following' | 'followers' | 'liked'> {
    /**
   * Le nom de l'auteur'
   * @example "Lady Gaga"
   */
     @IsString()
     @IsNotEmpty()
    @Prop({ required: true })
    nickname: string;

    /**
     * Le nom d'utilisateur
     * @example "@ladygaga"
     */
     @IsString()
     @IsNotEmpty()
    @Prop({ required: true, unique: true })
    username: string;

    @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  roles?: string[];
}
