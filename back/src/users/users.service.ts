import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, PipeTransform } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

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

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds);
    createUserDto.password = hashedPassword;
    try {
      await this.userModel.create(createUserDto)
    } catch (err) {
      if (err.code === 11000) {
        throw new ConflictException(`Username already exists`)
      }
      throw new InternalServerErrorException
    }
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  async findOne(id: ObjectId) {
    return await this.userModel.findById(id);
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    const response = await this.userModel.findOne({ username }).exec();
    return response;
  }

  update(id: ObjectId, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: ObjectId) {
    return `This action removes a #${id} user`;
  }
}
