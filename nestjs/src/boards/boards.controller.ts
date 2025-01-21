import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/createBoard.dto';

/**
 * Controller란?
 * 1. 요청의 진입점
 * 2. 데코레이터를 통해 Controller를 명시한다.
 * 3. 라우팅 처리
 * 4. 메서드 명시
 * 5. 요청이 들어오면 Controller에서 받아 Service로 보낸다.
 * 6. Service에서 처리한 결과를 Controller에서 반환한다.
 * 7. 브라우저와 같은 요청의 주체는 Controller와 소통한다.
 */
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardService: BoardsService) {}

  @Get('/')
  getBoards() {
    return this.boardService.getBoards();
  }

  @Post('/create')
  createBoard(@Body() body: CreateBoardDto) {
    return this.boardService.createBoard(body);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: string) {
    return this.boardService.getBoardById(id);
  }
}
