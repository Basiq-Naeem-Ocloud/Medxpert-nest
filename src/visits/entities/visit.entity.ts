import { Column, Index, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import { Doctor } from '../../users/entities/doctor.entity';
import { Patient } from '../../users/entities/patient.entity';
import { Prescription } from './prescription.entity';
import {PatientTest} from './patientTest.entity';

@Entity()
export class Visit {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    visitDate: Date

    @Column()
    @Index()
    doctorId: string;

    @Column()
    @Index()
    patientId: string;

    // @Column()
    // @Index()
    // patient: number;

    // @ManyToOne(() => Doctor, doctor => doctor.visits)
    // doctor: Doctor;
    //
    // @ManyToOne(() => Patient, patient => patient.visits)
    // patient: Patient;

    @OneToMany(() => Prescription, prescription => prescription.visit, {eager: true})
    prescriptions: Prescription[];

    @OneToMany(() => PatientTest, test => test.visit, {eager: true})
    tests: PatientTest[];
}
