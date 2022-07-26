import * as bcrypt from "bcryptjs";
import {
    ConflictException,
    InternalServerErrorException,
} from "@nestjs/common";
import { Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";

export class UserRpository extends Repository<User> {
    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.create({ username, password: hashedPassword });

        try {
            await this.save(user);
        } catch (error) {
            console.log(`error: ${error}`);
            if (error.code === "23505") {
                throw new ConflictException("존재하는 사용자 이름입니다");
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}
