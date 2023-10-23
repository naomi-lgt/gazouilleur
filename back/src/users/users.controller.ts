import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, BadRequestException, HttpException, HttpStatus, NotFoundException, ConflictException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ObjectId } from 'mongoose';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: "Création d'un User en base de données",
  })
  @ApiCreatedResponse({
    description: 'User créé avec succès.',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Erreur dans la création du User.',
    type: BadRequestException,
  })
  @Post()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({
    summary:
      'Récupération des users en base de données.',
  })
  @ApiOkResponse({
    description: 'La liste des users a été récupérée.',
    type: [User],
  })
  @ApiBadRequestResponse({
    description: 'Les données ne sont pas correctes.',
    type: BadRequestException,
  })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({
    summary:
      "Récupération d'un utilisateur avec ID en base de données.",
  })
  @ApiOkResponse({
    description: "L'utilisateur a été récupéré.",
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Les données ne sont pas correctes.',
    type: BadRequestException,
  })
  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({
    summary:
      "Récupération d'un utilisateur par son nom en base de données.",
  })
  @ApiOkResponse({
    description: "L'utilisateur a été récupéré.",
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Les données ne sont pas correctes.',
    type: BadRequestException,
  })
  @Get(':username')
  findOneByUsername(@Param('username') username: string) {
    return this.usersService.findOneByUsername(username);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: "Modification d'un utilisateur en base de données.",
  })
  @ApiOkResponse({
    description: 'Le utilisateur a bien été modifié.',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Les données ne sont pas correctes.',
    type: BadRequestException,
  })
  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: "Suppression d'un utilisateur en base de données.",
  })
  @ApiOkResponse({
    description: 'Le utilisateur a bien été supprimé.',
  })
  @ApiBadRequestResponse({
    description: 'Les données ne sont pas correctes.',
    type: BadRequestException,
  })
  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.usersService.remove(id);
  }
}
