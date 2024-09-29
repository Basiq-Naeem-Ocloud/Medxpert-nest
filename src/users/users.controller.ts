// import { Controller } from '@nestjs/common';
//
// @Controller('users')
// export class UsersController {}
// src/users/user.controller.ts
import {
    Controller,
    Post,
    Body,
    UseGuards,
    Param,
    Delete,
    NotFoundException,
    UseInterceptors,
    UploadedFile
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { CreatePatientDto } from './dto/create-patient.dto';
import {RoleGuard} from "./role.guard";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {UserRole} from "./entities/user.entity";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post('doctor')
    @UseInterceptors(FileInterceptor('picture', {
        storage: diskStorage({
            destination: "./uploads",
            filename : (req, file, cb) => {
                cb(null, `${file.originalname}`)
            }
        })
    }))

    createDoctor(
        @Body() createDoctorDto: CreateDoctorDto,
        @UploadedFile() picture: Express.Multer.File
    ) {  //todo added picture logic to db and dto
        console.log(createDoctorDto);
        console.log('picture = ', picture);
        if (picture) {
            createDoctorDto.picture = picture.filename; // Store the file name in the DTO
        }
        return this.userService.createDoctor(createDoctorDto);   //todo have to add code to get picture and body in response logic in notezz video at end
    }

    @Post('patient')
    createPatient(@Body() createPatientDto: CreatePatientDto) {
        return this.userService.createPatient(createPatientDto);
    }

    // add a delete function to delete patient also add @UseGuards(JwtAuthGuard, new RoleGuard(UserRole.DOCTOR)) to it

    //todo we should soft delete the patient by setting isActivate to false
    @Delete('deletePatient/:id')
    @UseGuards(JwtAuthGuard, new RoleGuard(UserRole.ADMIN))  // todo working fine yeppi
    async deletePatient(@Param('id') id: string) {
        // const result = await this.userService.deletePatient(id);
        // return { message: "Patient Deleted", result };
        try {
            const result = await this.userService.deletePatient(id);
            return result;
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }


    // @Post('deletePatient/:id')
    // @UseGuards(JwtAuthGuard, new RoleGuard(UserRole.ADMIN))
    // deletePatient(@Body() createPatientDto: CreatePatientDto) {
    //     return this.userService.deletePatient(createPatientDto);
    // }
}
