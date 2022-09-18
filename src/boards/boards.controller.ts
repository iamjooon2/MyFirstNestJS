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

    @Get("/:id")
    getBoardById(@Param("id") id: number): Promise<Board> {
        return this.boardsService.getBoardById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: createBoardDto): Promise<Board> {
        return this.boardsService.createBoard(createBoardDto);
    }

    @Delete("/:id")
    deleteBoard(@Param("id", ParseIntPipe) id: number): Promise<void> {
        return this.boardsService.deleteBoard(id);
    }

    @Patch("/:id/status")
    updateBoardStatus(
        @Param("id", ParseIntPipe) id: number,
        @Body("status", BoardStatusValidationPipe) status: BoardStatus,
    ): Promise<Board> {
        return this.boardsService.updateBoardStatus(id, status);
    }
}
