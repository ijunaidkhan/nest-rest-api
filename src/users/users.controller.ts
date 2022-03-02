/* eslint-disable prettier/prettier */
import { Controller, Get, Headers } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Body } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UsersController {

    constructor(private readonly userService: UserService){}
 
    @Get('getAllUsers')
    @ApiOperation({ summary: 'Get all users'})
    getAllUser(){
        return this.userService.getAllUsers();
    }

    @Post('createUser')
    @ApiOperation({ summary: 'For creating users'})
    addUser(@Body() createUSerDto: CreateUserDto) {
        return this.userService.addNewUser(createUSerDto)
    }

 
    @Post('updateUser/:id')
    @ApiOperation({ summary: 'Update Users'})
    updateUser(@Body() updateUser: CreateUserDto, @Param('id') id:string){
        return this.userService.updateUser(id, updateUser)
    }

   
    @Get('deleteUser/:id')
    @ApiOperation({ summary: 'Delete User by its id'})
   async deleteUser(@Param('id') id : string ){
       return this.userService.deleteUser(id) 
    }
}
