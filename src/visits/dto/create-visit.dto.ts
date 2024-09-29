// src/visits/dto/create-visit.dto.ts
import { IsString, Length} from 'class-validator';

export class CreateVisitDto {
    @IsString()
    @Length(13, 13)
    doctorId: string;

    @IsString()
    @Length(13, 13)
    patientId: string;
}
