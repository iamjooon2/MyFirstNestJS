import {
    Body,
    Param,
    Controller,
    Get,
    Post,
    Patch,
    UsePipes,
    ValidationPipe,
    Delete,
    ParseIntPipe,
    UseGuards,
} from "@nestjs/common";
import { BoardsService } from "./boards.service";
import { BoardStatus } from "./board-status.enum";
import { createBoardDto } from "./dto/create-board.dto";
import { BoardStatusValidationPipe } from "./pipes/board-status-validation.pipe";
import { Board } from "./board.entity";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/auth/get-user.decorator";
import { User } from "src/auth/user.entity";
import { identity } from "rxjs";

@Controller("boards")
// 인증 미들웨어 역할
@UseGuards(AuthGuard())
export class BoardsController {
    private boardsService: BoardsService;

    constructor(boardsService: BoardsService) {
        this.boardsService = boardsService;
    }

    @Get()
    getAllTask(): Promise<Board[]> {
        return this.boardsService.getAllBoards();
    }

    @Get()
    getAllBoards(@GetUser() user: User): Promise<Board[]> {
        return this.boardsService.getAllBoards(user);
    }

    @Get("/:id")
    getBoardById(@Param("id") id: number): Promise<Board> {
        return this.boardsService.getBoardById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() createBoardDto: createBoardDto,
        @GetUser() user: User,
    ): Promise<Board> {
        return this.boardsService.createBoard(createBoardDto, user);
    }

    @Delete("/:id")
    deleteBoard(
        @Param("id", ParseIntPipe) id,
        @GetUser() user: User,
    ): Promise<void> {
        return this.boardsService.deleteBoard(id, user);
    }

    @Patch("/:id/status")
    updateBoardStatus(
        @Param("id", ParseIntPipe) id: number,
        @Body("status", BoardStatusValidationPipe) status: BoardStatus,
    ): Promise<Board> {
        return this.boardsService.updateBoardStatus({ id, status });
    }
}
