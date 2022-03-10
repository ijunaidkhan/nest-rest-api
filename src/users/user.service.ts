/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { Types } from 'mongoose';

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private readonly _userModel: Model<User>){}


    //getAllUsers
    // async getAllUsers() {
    //     const totalCount = await this._userModel.countDocuments({});
    //     const getUsers = await this._userModel.find();
    //     return {
    //         data: getUsers,
    //         totalCount: totalCount
    //     }
    // }

    async getAllUsers(limit, offset) {
        // limit = parseInt(limit) < 1 ? 10 : limit;
        // offset = parseInt(offset) < 0 ? 0 : offset;
        // debugger
        // const totalCount = await this._userModel.countDocuments({});
        // debugger
        // const getUsers = await this._userModel
        // .find({})
        // // .sort({ creationDate: -1 })
        // .skip(parseInt(offset))
        // .limit(parseInt(limit))
        // // .then((result) => {
        // //     if(result) {
        // //         return {
        // //             data: getUsers,
        // //             totalCount: totalCount
        // //         }
        // //     }
        // //     else {
        // //         throw new HttpException('Users not Found', HttpStatus.NOT_FOUND)
        // //     }
        // // }).catch(() => {
        // //     throw new HttpException('Users not Found', HttpStatus.NOT_FOUND)
        // // })

        // return {
        //     totalCount: totalCount,
        //     data: getUsers
        // }

        try {
            limit = parseInt(limit) < 1 ? 10 : limit;
        offset = parseInt(offset) < 0 ? 0 : offset;
        debugger
        const totalCount = await this._userModel.countDocuments({});
        debugger
        const getUsers = await this._userModel
        .find({})
        .sort({ creationDate: -1 })
        .skip(parseInt(offset))
        .limit(parseInt(limit))

        return {
            totalCount: totalCount,
            data: getUsers
        }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND)
        }
    }

    //CreateNewUser
    async addNewUser(user){

        if(!user._id) {
            user._id = new Types.ObjectId().toString();
        }
        const newUser = new this._userModel(user)
        if(newUser.images && newUser.images.length) {
            for await ( const mediaObj of newUser.images) {
                await new Promise(async(resolve, reject)=>{
                    try{
                        let mediaUrl = '';
                        mediaUrl = mediaObj.captureFileURL;
                        resolve({})
                    }
                    catch(error) {
                        reject(error)
                    }
                })
            }
        }
        return await newUser.save();
    }

    async updateUser(user: CreateUserDto, id: string) {
        const findUser = await this._userModel.findOne({_id: id});
        if(findUser) {
            const updateUser = await this._userModel.findByIdAndUpdate(
                {_id:id} , user)
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

    // async updateUser(updateUser) {
    //     return await this._userModel.updateOne({_id: updateUser.id}, updateUser)
    // }

      async deleteUser(id: string): Promise<User>{
        if(id) {
            return await this._userModel.findByIdAndRemove({_id: id}).then((result) => {
                if (result) {
                    return result
                }
                else {
                    throw new HttpException('User with this ID does not Exist', HttpStatus.NOT_FOUND)
                }
            }).catch(() => {
                throw new HttpException('USer with this ID does not Exist', HttpStatus.NOT_FOUND)
            })
        }
      }

}
