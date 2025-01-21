import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/createBoard.dto';
import { BoardRepository } from './repository/board.repository';

@Injectable()
export class BoardsService {
  constructor(private readonly boardRepository: BoardRepository) {
    this.boardRepository = new BoardRepository();
  }

  getBoards() {
    return this.boardRepository.getAll();
  }

  createBoard(body: CreateBoardDto) {
    const boards = this.boardRepository.createBoard(body);

    return boards;
  }

  getBoardById(id: string) {
    return this.boardRepository.findBoardById(id);
  }

  deleteBoard(id: string) {
    const boards = this.boardRepository.deleteBoard(id);

    return boards;
  }
}
