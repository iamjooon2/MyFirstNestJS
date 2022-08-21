import { Body, Param, Controller, Get, Post , Patch} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.model';
import { createBoardDto } from './dto/create-board.dto';
@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) {}

    // Get 메서드
    @Get('/')
    getAllBoard(): Board[] {
        return this.boardsService.getAllBoards();
    }

    @Post('/')
    postBoard(@Body() createBoardDto: createBoardDto): Board {
        return this.boardsService.createBoard(createBoardDto);
    }

    @Get('/:id')
    getBoardById(@Param('id') id: string): Board {
        return this.boardsService.getBoardById(id);
    }

    @Patch('/:id')
    deleteBoard(@Param('id') id: string): void {
        this.boardsService.deleteBoard(id);
    }
}
