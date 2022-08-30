import {
    Body,
    Param,
    Controller,
    Get,
    Post,
    Patch,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './board.model';
import { createBoardDto } from './dto/create-board.dto';
@Controller('boards')
export class BoardsController {
    private boardsService: BoardsService;

    constructor(boardsService: BoardsService) {
        this.boardsService = boardsService;
    }

    // // Get 메서드
    // @Get('/')
    // getAllBoard(): Board[] {
    //     return this.boardsService.getAllBoards();
    // }

    // @Post('/')
    // @UsePipes(ValidationPipe)
    // postBoard(@Body() createBoardDto: createBoardDto): Board {
    //     return this.boardsService.createBoard(createBoardDto);
    // }

    // @Get('/:id')
    // getBoardById(@Param('id') id: string): Board {
    //     return this.boardsService.getBoardById(id);
    // }

    // @Patch('/:id')
    // deleteBoard(@Param('id') id: string): void {
    //     this.boardsService.deleteBoard(id);
    // }

    // @Patch('/:id/status')
    // updateBoardStatus(
    //     @Param('id') id: string,
    //     @Body('status') status: BoardStatus,
    // ) {
    //     return this.boardsService.updateBoardStatus(id, status);
    // }
}
