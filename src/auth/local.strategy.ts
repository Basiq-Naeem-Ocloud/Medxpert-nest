import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-local";
// import {UsersService} from "../users/users.service";
import {AuthService} from "./auth.service";
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {User} from "../users/entities/user.entity";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    console.log('here inside local strategy');

    if (!user) {
      // throw new UnauthorizedException();
      console.log('user not found unable to login unauthorized')
    }
    // if (user.password !== password) {
    //   // throw new UnauthorizedException();
    //   console.log('password not matched')
    // }

    return user;
  }
}

