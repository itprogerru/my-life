import { Controller, ValidationPipe, Body, Post } from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthCredentialsDto} from './dto/auth-credentials.dto';
import {ApiUseTags} from "@nestjs/swagger";
import {TokenCredentialsDto} from "./dto/token-credentials.dto";

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    singIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        return this.authService.singIn(authCredentialsDto);
    }

    @Post('/refresh-token')
    refreshToken(@Body(ValidationPipe) tokenCredentialsDto: TokenCredentialsDto) {

    }
}
