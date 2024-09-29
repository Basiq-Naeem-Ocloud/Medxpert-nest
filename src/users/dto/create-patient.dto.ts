// src/users/dto/create-patient.dto.ts
import { CreateUserDto } from './create-user.dto';
import { IsString, IsNumber, Length } from 'class-validator';

export class CreatePatientDto extends CreateUserDto {
    @IsString()
    @Length(11, 11)
    emergency_number: string;

    @IsNumber()
    age: number;
}
