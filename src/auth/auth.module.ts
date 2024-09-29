import {Module} from '@nestjs/common';
import {PassportModule} from "@nestjs/passport";
import {UsersModule} from "../users/users.module";
import {LocalStrategy} from "./local.strategy";
import {AuthService} from './auth.service';
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./jwt.strategy";

@Module({
    imports: [PassportModule, UsersModule,
        JwtModule.register({
            secret: "MEDXPERTxPUCITx2023",  //in real life secret key is very complex and should be stored in .env file see documentation
            signOptions: {expiresIn: '24h'},
        })],
    providers: [LocalStrategy, JwtStrategy, AuthService],
    exports: [AuthService]
})
export class AuthModule {
}