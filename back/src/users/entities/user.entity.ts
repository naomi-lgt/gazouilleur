import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { HydratedDocument, ObjectId } from 'mongoose';

@Schema()
export class User {
  /**
   * L'avatar de l'utilisateur'
   * @example "https://pbs.twimg.com/profile_images/1143032401108578305/8IYSjofV_400x400.jpg"
   */
   @IsString()
  @Prop({
    default:
      'https://pbs.twimg.com/profile_images/1143032401108578305/8IYSjofV_400x400.jpg',
  })
  avatar: string;

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

  /**
   * Le mot de passe de l'utilisateur
   * @example "motdepasse1234"
   */
   @IsString()
   @IsNotEmpty()
  @Prop({ required: true })
  password: string;

  /**
   * La description d'utilisateur
   * @example "Nouveau sur Gazouilleur"
   */
   @IsString()
   @IsOptional()
  @Prop({ default: 'Nouveau sur Gazouilleur' })
  description?: string;


  /**
   * La liste des personnes que l'utilisateur suit
   * @example "["3b44424280af93cab4312c3", "63b4442c280af93cab4312c5"]"
   */
   @IsOptional()
  @Prop({ default: [] })
  following?: ObjectId[];

  /**
   * Le nombre personnes qui suivent l'utilisateur
   * @example 573864923
   */
  @IsNumber()
   @IsOptional()
  @Prop({ default: 0 })
  followers?: number;

  /**
   * Le nombre de j'aime que l'utilisateur a récoltés
   * @example 573864923
   */
   @IsNumber()
   @IsOptional()
  @Prop({ default: 0 })
  liked?: number;

  constructor(avatar: string, nickname: string, username: string, password: string, description?: string, following?: ObjectId[], followers?: number, liked?: number) {
    this.avatar = avatar;
    this.nickname = nickname;
    this.username = username;
    this.password = password;
    this.description = description;
    this.following = following;
    this.followers = followers;
    this.liked = liked;
  }
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
