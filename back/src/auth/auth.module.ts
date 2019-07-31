import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import * as config from 'config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserRepository} from './user.repository';
import {JwtStrategy} from './jwt.strategy';

const jwtConfig = config.get('jwt');

@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: 'jwt',
        }),
        JwtModule.register({
            secret: jwtConfig.secret,
            signOptions: {
                expiresIn: jwtConfig.expiresIn,
            },
        }),
        TypeOrmModule.forFeature([UserRepository]),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtStrategy,
    ],
    exports: [
        JwtStrategy,
        PassportModule,
    ],
})
export class AuthModule {}
