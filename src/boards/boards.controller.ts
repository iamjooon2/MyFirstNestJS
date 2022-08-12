import { Controller, Get } from '@nestjs/common';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
    constructor (private boardsService: BoardsService){}
    
    // Get 메서드
    @Get('/')
    getAllBoard() {
        return this.boardsService.getAllBoards();
    }
}