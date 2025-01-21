import { CreateBoardDto } from '../dto/createBoard.dto';

/**
 * Repository란?
 * 1. 데이터베이스와 통신하는 역할
 * 2. 데이터베이스의 데이터를 조회, 생성, 삭제하는 역할
 * 3. Repository는 필수가 아니다. Service에서 직접 데이터베이스에 접근해도 된다.
 *    다만, 데이터베이스와 통신하는 로직을 모아두면 유지, 보수가 용이해진다.
 *    유지, 보수가 용이해진다는 말은 각 레이어의 책임이 간단해지고 명확해진다는 뜻이다.
 *    레이어 간의 의존성은 줄이는 것이 좋다고 생각한다.
 */
export class BoardRepository {
  private boards: CreateBoardDto[] = [];

  public getAll() {
    return this.boards;
  }

  public findBoardById(id: string): CreateBoardDto {
    return this.boards.find((board) => board.id === id);
  }

  public deleteBoard(id: string) {
    this.boards = this.boards.filter((board) => board.id !== id);
    return this.boards;
  }

  public createBoard(board: CreateBoardDto) {
    this.boards.push(board);
    return this.boards;
  }
}
