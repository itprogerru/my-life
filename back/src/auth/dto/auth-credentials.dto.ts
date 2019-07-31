import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import {ApiModelProperty} from "@nestjs/swagger";

export class AuthCredentialsDto {
    @ApiModelProperty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @ApiModelProperty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password to week'})
    password: string;
}
