/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private readonly _userModel: Model<User>){}


    //getAllUsers
    async getAllUsers() {
        const totalCount = await this._userModel.countDocuments({});
        const getUsers = await this._userModel.find();
        return {
            data: getUsers,
            totalCount: totalCount
        }
    }

    //CreateNewUser
    async addNewUser(user: CreateUserDto ){
        const newUser = new this._userModel(user)
        return await newUser.save();
    }

    async updateUser(id: string, user: CreateUserDto) {
        const findUser = await this._userModel.findOne({_id: id});
        if(findUser) {
            const updateUser = await this._userModel.findByIdAndUpdate({_id:id} , user)
            .then((result) => {
                if(result) {
                    return result
                }
                else {
                    throw new HttpException('Failed to updated user', HttpStatus.BAD_REQUEST);
                }
            })
            return updateUser;
        }
         else {
            throw new HttpException('Failed to updated user', HttpStatus.BAD_REQUEST);
         }
      }

      async deleteUser(id){
        const deleteUser = await this._userModel.deleteOne({ _id: id });
        return deleteUser;
      }

}
