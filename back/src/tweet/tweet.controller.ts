import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
  Injectable,
  PipeTransform,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { ObjectId, Types } from 'mongoose';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Tweet } from './entities/tweet.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { TweetResponseDto } from './dto/tweet.response.dto';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<any, Types.ObjectId> {
  transform(value: any): Types.ObjectId {
    const validObjectId = Types.ObjectId.isValid(value);

    if (!validObjectId) {
      throw new BadRequestException(`L'ID n'est pas de type ObjectId`);
    }

    return value;
  }
}

@Controller('tweets')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: "Création d'un tweet en base de données",
  })
  @ApiCreatedResponse({
    description: 'Tweet créé avec succès.',
    type: Tweet,
  })
  @ApiBadRequestResponse({
    description: 'Erreur dans la création du tweet.',
    type: BadRequestException,
  })
  @Post()
  create(@Body() createTweetDto: CreateTweetDto, @Request() request){
    console.log(request.user.username);
    console.log(createTweetDto)
    const tweet = {
      content: createTweetDto.content,
      author: request.user.username,
    };
    console.log(tweet)
    return this.tweetService.create(tweet);
  }

  // @ApiOperation({
  //   summary:
  //     "Récupération de l'utilisateur en base de données.",
  // })
  // @ApiOkResponse({
  //   description: 'Les informations.',
  //   type: Object,
  // })
  // @ApiBadRequestResponse({
  //   description: 'Les données ne sont pas correctes.',
  //   type: BadRequestException,
  // })
  // @Get('blabla')
  // findUserInfo(@Param('blabla') @Request() request) {
  //   if(request?.user) {
  //     console.log(request.user);
  //   }
  //   return this.tweetService.findUserInfo(request);
  // }

  @ApiOperation({
    summary:
      'Récupération des tweets en base de données.',
  })
  @ApiOkResponse({
    description: 'La liste des tweets a été récupérée.',
    type: [TweetResponseDto],
  })
  @ApiBadRequestResponse({
    description: 'Les données ne sont pas correctes.',
    type: BadRequestException,
  })
  @Get()
  findAll() {
    return this.tweetService.findAll();
  }

  @ApiOperation({
    summary:
      'Récupération des informations des commentaires en base de données.',
  })
  @ApiOkResponse({
    description: 'La liste des utilisateurs a été récupérée.',
    type: [TweetResponseDto],
  })
  @ApiBadRequestResponse({
    description: 'Les données ne sont pas correctes.',
    type: BadRequestException,
  })
  @Get(':id/comments')
  findCommentsInfo(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    return this.tweetService.findCommentsInfo(id);
  }

  @ApiOperation({
    summary: "Récupération d'un tweet avec id en base de données.",
  })
  @ApiOkResponse({
    description: 'Le tweet avec cet id a été récupérée.',
    type: Tweet,
  })
  @ApiNotFoundResponse({
    description: "Le tweet n'a pas été trouvé.",
    type: NotFoundException,
  })
  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    console.log('findOne')
    return this.tweetService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: "Ajout d'un commentaire à un tweet",
  })
  @ApiOkResponse({
    description: 'Le tweet avec cet id a été modifié.',
    type: Tweet,
  })
  @ApiBadRequestResponse({
    description: 'Les données ne sont pas correctes.',
    type: BadRequestException,
  })
  @Post(':id/comments')
  addComment(@Param('id', ParseObjectIdPipe) id: ObjectId, @Body() comment: CreateCommentDto, @Request() request) {
    console.log(comment)
    const newComment = {
      author: request.user.username,
      content: comment.content
    }
    return this.tweetService.addComment(id, newComment);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: "Suppression d'un tweet en base de données.",
  })
  @ApiOkResponse({
    description: 'Le tweet a bien été supprimé.',
  })
  @ApiBadRequestResponse({
    description: 'Les données ne sont pas correctes.',
    type: BadRequestException,
  })
  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    return this.tweetService.remove(id);
  }
}
