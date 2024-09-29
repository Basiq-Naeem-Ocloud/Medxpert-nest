// src/users/dto/create-doctor.dto.ts
import { CreateUserDto } from './create-user.dto';
import { IsString, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDoctorDto extends CreateUserDto {
    @IsString()
    @IsOptional()
    specialization?: string;

    @IsNumber()
    // todo we have updated this dto so that we can get data in form-data from postman as form-data
    // todo sends data in form of string and we have validation on fee and license number should be number so that is why we are converting it to number here
    @Type(() => Number)
    fee: number;

    @IsNumber()
    @Type(() => Number)
    license_number: number;

    @IsString()
    @IsOptional()
    clinic_address?: string;
}
