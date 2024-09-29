// src/users/dto/create-user.dto.ts
import { IsString, IsOptional, IsNumber, Length, IsEmail } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @Length(13, 13)
    id: string;

    @IsString()
    name: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    picture?: string;
}
