// import { Controller } from '@nestjs/common';
//
// @Controller('visits')
// export class VisitsController {}

import {Controller, Post, Body, Get, Param} from '@nestjs/common';
import { VisitsService } from './visits.service';
import { CreateVisitDto } from './dto/create-visit.dto';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { CreateTestDto } from './dto/create-test.dto';

@Controller('visits')
export class VisitsController {
    constructor(private readonly visitService: VisitsService) {}

    @Post('create-visit')
    createVisit(@Body() createVisitDto: CreateVisitDto) {
        //todo add validation for doctorId and patientId
        console.log('inside create visit')
        return this.visitService.createVisit(createVisitDto);
    }

    @Post('prescription')
    addPrescription(@Body() createPrescriptionDto: CreatePrescriptionDto) {
        return this.visitService.addPrescription(createPrescriptionDto);
    }

    @Post('test')
    addTest(@Body() createTestDto: CreateTestDto) {
        console.log("inside test")
        return this.visitService.addTest(createTestDto);
    }

    @Get('doctor/:doctorId')
    getAllVisitsByDoctorId(@Param('doctorId') doctorId: string) {
        console.log('inside get all visits by doctor id')
        return this.visitService.getAllVisitsByDoctorId(doctorId);
    }

    @Get('patient/:patientId')
    getAllVisitsByPatientId(@Param('patientId') patientId: string) {
        return this.visitService.getAllVisitsByPatientId(patientId);
    }
}
