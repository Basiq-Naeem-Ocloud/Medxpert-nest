import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import { Visit } from './visit.entity';

@Entity()
export class PatientTest {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    testName: string;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn({ nullable: true })
    updatedAt: Date

    @ManyToOne(() => Visit, visit => visit.tests)
    visit: Visit;
}
