// import { Injectable } from '@nestjs/common';
//
// @Injectable()
// export class UsersService {}
// src/users/user.service.ts
import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Doctor } from './entities/doctor.entity';
import { Patient } from './entities/patient.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { CreatePatientDto } from './dto/create-patient.dto';
// import {MailerService} from "../email/mailer.service";
import { MailerService } from '../email/mailer.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Doctor)
        private doctorRepository: Repository<Doctor>,
        @InjectRepository(Patient)
        private patientRepository: Repository<Patient>,
        private readonly mailerService: MailerService,
    ) {}

    async createDoctor(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
        const doctor = this.doctorRepository.create(createDoctorDto);
        await this.mailerService.sendMail(
            doctor.email,
            'Congratulations on registering on MEDXPERT!',
            `Welcome to MEDXPERT 🚀, ${doctor.name} 🩺.\n If you are facing an issues please reachout to us. Please stay connect for more.`
        );
        return this.doctorRepository.save(doctor);
    }

    async createPatient(createPatientDto: CreatePatientDto): Promise<Patient> {
        const patient = this.patientRepository.create(createPatientDto);
        return this.patientRepository.save(patient);
    }

    async getUserByCnicForLogin(cnic: string): Promise<User>
    {
        return this.userRepository.findOne({where: {id: cnic}});
    }

    //add a deletePatient function here that will take cnic of patient and delete it from database
     async deletePatient(id: string): Promise<boolean> {
         const result = await this.patientRepository.delete(id);

         if (result.affected === 0) {
             throw new NotFoundException(`Patient with ID ${id} not found`);
         }

         return !!result;
    }

}
