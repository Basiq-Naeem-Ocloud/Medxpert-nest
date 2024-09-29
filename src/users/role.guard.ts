// medxpert/src/users/role.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from './entities/user.entity';

@Injectable()
export class RoleGuard implements CanActivate {
    private rolePassed: string;
    constructor(role: string) {
        this.rolePassed=role;
    }

    canActivate(context: ExecutionContext): boolean {
        // const requiredRoles = this.reflector.get<UserRole[]>('roles', context.getHandler());
        // if (!requiredRoles) {
        //     return true;
        // }
        const { user } = context.switchToHttp().getRequest();
        return this.rolePassed === user.role;
    }
}