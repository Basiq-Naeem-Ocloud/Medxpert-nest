import {Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {User} from "../users/entities/user.entity";

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService) {}

    //id card for our app
    // generateJwtToken(payload: User): string
    // {
    //     return this.jwtService.sign(payload);
    // }
    generateJwtToken(user: User): string {
        const payload = this.transformUser(user);
        return this.jwtService.sign(payload);
    }
    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.getUserByCnicForLogin(username);
        console.log('here inside local strategy');

        if (!user) {
            // throw new UnauthorizedException();
            console.log('user not found')
        }
        if (user.password !== password) {
            // throw new UnauthorizedException();
            console.log('password not matched')
        }

        return user;
    }

    private
    transformUser(user: any): any {
        const { id, name, email, createdAt, updatedAt, ...rest } = user;
        return { id, name, email, createdAt, updatedAt, ...rest };
    }
}
