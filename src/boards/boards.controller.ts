import { Body, Controller, Get, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.model';
@Controller('boards')
export class BoardsController {
    constructor (private boardsService: BoardsService){}
    
    // Get 메서드
    @Get('/')
    getAllBoard(): Board[] {
        return this.boardsService.getAllBoards();
    }

    @Post('/')
    postBoard(
        @Body('title') title: string,
        @Body('description') description: string,
    ) : Board{
        return this.boardsService.createBoard(title, board);
    }
}