import { User } from "src/auth/user.entity";
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { BoardStatus } from "./board-status.enum";

@Entity() // 테이블로 변환됨
export class Board extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: BoardStatus;

    // N : 1의 관계
    @ManyToOne(type => User, (user) => user.boards, { eager: false })
    user: User;
}
