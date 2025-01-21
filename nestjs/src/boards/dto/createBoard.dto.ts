import { BoardStatus } from '../boards.model';

export class CreateBoardDto {
  id: string;
  title: string;
  description: string;
  status?: BoardStatus;
}
