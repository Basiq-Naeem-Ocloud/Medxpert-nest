import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { VisitsModule } from './visits/visits.module';
import { User } from './users/entities/user.entity';
import { Doctor } from './users/entities/doctor.entity';
import { Patient } from './users/entities/patient.entity';
import { Visit } from './visits/entities/visit.entity';
import { Prescription } from './visits/entities/prescription.entity';
import { PatientTest } from './visits/entities/patientTest.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    VisitsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456789',
      database: 'medxpert',
      entities: [User, Doctor, Patient, Visit, Prescription, PatientTest],
      synchronize: true,
      logging: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
