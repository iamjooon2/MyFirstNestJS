import {
    Body,
    Controller,
    Post,
    Req,
    UseGuards,
    ValidationPipe,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("/authTest")
    // useguard와 authguard가 되어있어야 request 객체 자체에 user 객체가 들어와있음
    // 그걸 전재로 해야 데코레이터에서의 getUser 사용가능
    @UseGuards(AuthGuard())
    authTest(@Req() req) {
        console.log(req);
    }

    @Post("/signup")
    signUp(
        @Body(ValidationPipe) AuthCredentialsDto: AuthCredentialsDto,
    ): Promise<void> {
        return this.authService.signUp(AuthCredentialsDto);
    }

    @Post("/signin")
    signIn(
        @Body(ValidationPipe) AuthCredentialsDto: AuthCredentialsDto,
    ): Promise<{ accessToken: string }> {
        return this.authService.signIn(AuthCredentialsDto);
    }
}
