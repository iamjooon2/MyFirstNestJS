import { Board } from "src/boards/board.entity";
import {
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    Entity,
    Unique,
    OneToMany,
} from "typeorm";
import bcrypt from "bcryptjs";

@Entity()
@Unique(["username"])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    // 1 : N의 관계
    // 타입 지정, board는 board의 user column으로 접근해야함, eager는 board의 정보를 갖고 오는 것을 허락할거냐
    @OneToMany(type => Board, (board) => board.user, { eager: true })
    boards: Board[];

    async validatePassword(password: string): Promise<boolean> {
        const isValid = await bcrypt.compare(password, this.password);

        return isValid;
    }
}
