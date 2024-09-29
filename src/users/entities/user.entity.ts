import {Entity, PrimaryColumn, Column , TableInheritance, CreateDateColumn, UpdateDateColumn} from 'typeorm';
export enum UserRole {
    ADMIN = 'admin',
    DOCTOR = 'doctor',
    PATIENT = 'patient',
    GUEST = 'guest'
}
@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class User {
    @PrimaryColumn({ length: 13 }) //cnic will be id
    id: string;

    @Column()
    name: string;

    @Column({nullable: true})
    email: string;

    @Column({nullable: true})
    picture: string;

    @Column()
    password: string;   //doctor and patient will be login using cnic and password

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.GUEST
    })
    role: UserRole;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn({ nullable: true })
    updatedAt: Date
}
