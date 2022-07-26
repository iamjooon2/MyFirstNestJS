import { EntityRepository, Repository } from "typeorm";
import { BoardStatus } from "./board-status.enum";
import { Board } from "./board.entity";
import { createBoardDto } from "./dto/create-board.dto";
export class BoardRepository extends Repository<Board> {
    async createBoard(createBoardDto: createBoardDto): Promise<Board> {
        const { title, description } = createBoardDto;

        const board = this.create({
            title,
            description,
            status: BoardStatus.PUBLIC,
            user,
        });

        await this.save(board);
        return board;
    }
}
