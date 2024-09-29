import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Visit} from './entities/visit.entity';
import {Prescription} from './entities/prescription.entity';
import {PatientTest} from './entities/patientTest.entity';
import {CreateVisitDto} from './dto/create-visit.dto';
import {CreatePrescriptionDto} from './dto/create-prescription.dto';
import {CreateTestDto} from './dto/create-test.dto';
import {Doctor} from '../users/entities/doctor.entity';
import {Patient} from '../users/entities/patient.entity';

@Injectable()
export class VisitsService {
    constructor(
        @InjectRepository(Visit)
        private visitRepository: Repository<Visit>,
        @InjectRepository(Prescription)
        private prescriptionRepository: Repository<Prescription>,
        @InjectRepository(PatientTest)
        private testRepository: Repository<PatientTest>,
        @InjectRepository(Doctor)
        private doctorRepository: Repository<Doctor>,
        @InjectRepository(Patient)
        private patientRepository: Repository<Patient>,
    ) {
    }

    async createVisit(createVisitDto: CreateVisitDto): Promise<Visit> {
        const {doctorId, patientId} = createVisitDto;
        const doctor = await this.doctorRepository.findOne({where: {id: doctorId}});
        const patient = await this.patientRepository.findOne({where: {id: patientId}});

        if (!doctor || !patient) {
            throw new NotFoundException('Doctor or Patient not found');
        }

        const visit = this.visitRepository.create({doctorId, patientId});
        return this.visitRepository.save(visit);
    }

    async addPrescription(createPrescriptionDto: CreatePrescriptionDto): Promise<Prescription> {
        const {visitId, prescription} = createPrescriptionDto;
        const visit = await this.visitRepository.findOne({where: {id: visitId}});

        if (!visit) {
            throw new NotFoundException('Visit not found');
        }

        const newPrescription = this.prescriptionRepository.create({prescription, visit});
        return this.prescriptionRepository.save(newPrescription);
    }

    async addTest(createTestDto: CreateTestDto): Promise<PatientTest> {
        const {visitId, testName} = createTestDto;
        const visit = await this.visitRepository.findOne({where: {id: visitId}});

        if (!visit) {
            throw new NotFoundException('Visit not found');
        }

        const newTest = this.testRepository.create({testName, visit});
        return this.testRepository.save(newTest);
    }

    async getAllVisitsByPatientId(patientId: string): Promise<Visit[]> {
        const patient = await this.patientRepository.findOne({where: {id: patientId}});
        if (!patient) {
            throw new NotFoundException(`Patient with ID ${patientId} not found`);
        }

        return this.visitRepository.find({
            where: {patientId: patientId},  //ye pori patient ki entity expect kar rha ha
        });
    }


    async getAllVisitsByDoctorId(doctorId: string): Promise<Visit[]> {
        const doctor = await this.doctorRepository.findOne({where: {id: doctorId}});
        if (!doctor) {
            throw new NotFoundException(`Doctor with ID ${doctorId} not found`);
        }

        return await this.visitRepository.find({
            where: {doctorId: doctorId},
        });

    }

}
