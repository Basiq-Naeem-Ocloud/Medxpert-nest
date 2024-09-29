// src/visits/dto/create-prescription.dto.ts
import { IsString, IsNumber } from 'class-validator';

export class CreatePrescriptionDto {
    @IsNumber()
    visitId: number;

    @IsString()
    prescription: string;
}
