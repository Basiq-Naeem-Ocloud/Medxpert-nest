import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';
// import {Controller, Get, Post, UseGuards} from '@nestjs/common';
// import { AppService } from './app.service';
// import {AuthGuard} from "@nestjs/passport";

// @Injectable()
// class LocalAuthGuard extends NestAuthGuard('local') {
//   canActivate(context: ExecutionContext) {
//     console.log( 'context body', context.switchToHttp().getRequest().body);
//     // console.log('true or false = ', super.canActivate(context));
//     return  super.canActivate(context);
//   }
// }


import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { AuthGuard } from '@nestjs/passport';

import { AppService } from './app.service';
import {LocalAuthGuard} from "./auth/local-auth.guard";
import {AuthService} from "./auth/auth.service";
import {User, UserRole} from "./users/entities/user.entity";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";
import {RoleGuard} from "./users/role.guard";


@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): any {
    const token = this.authService.generateJwtToken(req.user)
    return {"access Token": token};
  }

  @UseGuards(JwtAuthGuard, new RoleGuard(UserRole.DOCTOR))
  @Get('android-dev')
  androidDev(@Request() req): any {
    // const token = this.authService.generateJwtToken(req.user)
    return {"message": "Welcome to android dev by doctor"};
  }
}
