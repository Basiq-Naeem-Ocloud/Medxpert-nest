import { Module } from '@nestjs/common';
import { VisitsController } from './visits.controller';
import { VisitsService } from './visits.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Visit} from "./entities/visit.entity";
import {Prescription} from "./entities/prescription.entity";
import {Test} from "@nestjs/testing";
import {Doctor} from "../users/entities/doctor.entity";
import {Patient} from "../users/entities/patient.entity";
import {PatientTest} from "./entities/patientTest.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Visit, Prescription, PatientTest, Doctor, Patient])],
  controllers: [VisitsController],
  providers: [VisitsService]
})
export class VisitsModule {}