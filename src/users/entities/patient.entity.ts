import {Column, ChildEntity, OneToMany, Entity} from 'typeorm';
import { User } from './user.entity';
import { Visit } from '../../visits/entities/visit.entity';

@ChildEntity()
export class Patient extends User {

    @Column({length: 11})
    emergency_number: string

    @Column()
    age: number

    // @OneToMany(() => Visit, visit => visit.patient)
    // visits: Visit[];
}
