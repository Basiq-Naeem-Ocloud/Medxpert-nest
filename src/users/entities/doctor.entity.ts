import {Entity, Column, OneToMany, ChildEntity} from 'typeorm';
import { User } from './user.entity';
import { Visit } from '../../visits/entities/visit.entity';

@ChildEntity()
export class Doctor extends User {

    @Column({nullable: true})
    specialization: string;

    @Column()
    fee: number;

    @Column()
    license_number: number;

    @Column({ default: '' })
    clinic_address: string

    // @OneToMany(() => Visit, visits => visits.doctor)
    // visits: Visit[];
}
