import {Injectable, Logger, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UserRepository} from './user.repository';
import { JwtService } from '@nestjs/jwt';
import {AuthCredentialsDto} from './dto/auth-credentials.dto';
import {JwtPayload} from './jwt-payload.interface';
import {TokenCredentialsDto} from "./dto/token-credentials.dto";
import {TokenExpiredError} from "jsonwebtoken";

@Injectable()
export class AuthService {
    private logger = new Logger('AuthService');
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        await this.userRepository.signUp(authCredentialsDto);
        const { username } = authCredentialsDto;
        const payload: JwtPayload = { username };
        const accessToken = await this.jwtService.sign(payload);
        return { accessToken };

    }

    async singIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string, refreshToken: string }> {
        const username = await this.userRepository.validateUserPassword(authCredentialsDto);
        if (!username) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload: JwtPayload = { username };
        const accessToken = await this.jwtService.sign(payload);
        const refreshToken = await this.jwtService.sign(payload,{ expiresIn: 3600*2,});
        this.logger.debug(`Generate JWT Token with payload ${JSON.stringify(payload)}`);
        return { accessToken, refreshToken };
    }

    async refreshToken(tokenCredentialsDto: TokenCredentialsDto): Promise<{ accessToken: string, refreshToken: string }> {
        const { refreshToken } = tokenCredentialsDto;
        try {
            await this.jwtService.verify(refreshToken);
            const newAccessToken = await this.jwtService.sign({user: 'test'});
            const newRefreshToken = await this.jwtService.sign({user: 'test2'}, { expiresIn: 3600,})
            return { accessToken: newAccessToken, refreshToken: newRefreshToken}
        }catch (e) {
            throw new TokenExpiredError('null', 3600)
        }

    }
}
