/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UserService } from '../users/user.service';
import { UserSchema } from './schemas/user.schema';


@Module({
  imports: [MongooseModule.forFeature([


  { name: 'User', schema: UserSchema }
  ])],
  controllers: [UsersController],
  providers: [UserService],
})
export class UserModule {}
