import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Doctor} from "./entities/doctor.entity";
import {Patient} from "./entities/patient.entity";
import {EmailModule} from "../email/email.module";

@Module({
  imports: [TypeOrmModule.forFeature([User, Doctor, Patient]), EmailModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
