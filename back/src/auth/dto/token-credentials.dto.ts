import {IsString} from "class-validator";
import {ApiModelProperty} from "@nestjs/swagger";

export class TokenCredentialsDto {
    @ApiModelProperty()
    @IsString()
    refreshToken: string;
}
