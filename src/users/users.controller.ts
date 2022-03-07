/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prettier/prettier */
import { Controller, Get, Headers, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Body } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Delete } from '@nestjs/common';
// import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('User')
@Controller('users')
export class UsersController {

    constructor(private readonly userService: UserService){}
 
    @Get('getAllUsers')
    @ApiOperation({ summary: 'Get all users'})
    getAllUser(
    @Query('limit') limit: number = 10, 
    @Query('offset') offset: number = 0){
        return this.userService.getAllUsers(limit, offset);
    }

    @Post('createUser')
    @ApiOperation({ summary: 'For creating users'})
    addUser(@Body() createUSerDto: CreateUserDto) {
        return this.userService.addNewUser(createUSerDto)
    }

 
    @Put('updateUser/:id')
    @ApiOperation({ summary: 'Update Users'})
    updateUser(@Body() updateUser: CreateUserDto, @Param('id') id:string){
        return this.userService.updateUser(updateUser, id)
    }

    // @Post('updateUser/:id')
    // @ApiOperation({ summary: 'Update Users By Id'})
    // updateUser(@Body() updateUser: UpdateUserDto){
    //     return this.userService.updateUser(updateUser)
    // }

   
    @Delete('deleteUser/:id')
    @ApiOperation({ summary: 'Delete User by its id'})
   async deleteUser(@Param('id') id : string ){
       return this.userService.deleteUser(id) 
    }
}
