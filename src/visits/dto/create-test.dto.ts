// src/visits/dto/create-test.dto.ts
import { IsString, IsNumber } from 'class-validator';

export class CreateTestDto {
    @IsNumber()
    visitId: number;

    @IsString()
    testName: string;
}
