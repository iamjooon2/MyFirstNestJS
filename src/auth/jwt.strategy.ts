import { UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./user.entity";
import { UserRpository } from "./user.repository";
import * as config from "config";

const jwtConfig = config.get("db");
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        // userRepository 주입
        @InjectRepository(UserRpository)
        private userRepository: UserRpository,
    ) {
        // 부모 컴포넌트꺼 사용하기
        super({
            secretOrKey: process.env.JWT_SECRET || jwtConfig.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload) {
        const { username } = payload;
        const user: User = await this.userRepository.findOne(username);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
