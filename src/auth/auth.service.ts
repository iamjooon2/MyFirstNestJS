import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRpository } from "./user.repository";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRpository)
        private userRepository: UserRpository,
    ) {}
}
