import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { UserRpository } from "./user.repository";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRpository)
        private userRepository: UserRpository,
        private jwtService: JwtService,
    ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.createUser(authCredentialsDto);
    }

    async signIn(
        authCredentialsDto: AuthCredentialsDto,
    ): Promise<{ accessToken: string }> {
        const { username, password } = authCredentialsDto;
        const user = await this.userRepository.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            // 유저 토큰 생성
            // 페이로드엔 중요한 정보 넣으면 안 됨
            const payload = { username };
            // 알아서 secret과 payload를 합쳐서 토큰 만듬
            const accessToken = await this.jwtService.sign(payload);

            return { accessToken: `Bearer ${accessToken}` };
        } else {
            throw new UnauthorizedException("로그인 실패");
        }
    }
}
