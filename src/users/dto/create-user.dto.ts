/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";

/* eslint-disable prettier/prettier */
export class CreateUserDto {

    @ApiProperty()
    _id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    bio: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    address: string;

    @ApiProperty()
    experience: string;

    @ApiProperty()
    techStack: string;

    @ApiProperty()
    education: string;

    @ApiProperty()
    phoneno: number;
  }


