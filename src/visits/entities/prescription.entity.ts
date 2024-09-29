import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import { Visit } from './visit.entity';

@Entity()
export class Prescription {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    prescription: string;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn({ nullable: true })
    updatedAt: Date

    @ManyToOne(() => Visit, visit => visit.prescriptions)
    visit: Visit;
}
