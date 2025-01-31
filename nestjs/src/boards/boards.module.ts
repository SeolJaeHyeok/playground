import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { BoardRepository } from './repository/board.repository';

@Module({
  controllers: [BoardsController],
  /**
   * Service 계층은 Repository에 의존한다.
   * Repository를 DI 컨테이너에 등록하여 사용하지 않으면 NestJS가 자동으로 주입하지 않는다.
   * 따라서, 모듈에서 레포지토리를 주입하여 사용한다.
   *
   * NestJS에서 객체를 생성하거나 주입하기 위해서는 DI 컨테이너에 해당 객체를 반드시 등록해야 한다.
   * 이 등록 과정은 @Module 데코레이터의 providers 배열을 통해 이루어진다.
   *
   * Repository를 providers에 등록해야 하는 이유 정리
   * 1. DI 컨테이너에서 의존성을 해결하기 위해:
   * - NestJS는 providers 배열에 등록된 클래스만 의존성으로 주입할 수 있다.
   * - BoardRepository가 providers에 없다면, BoardsService에 주입할 수 없다.
   *
   * 2. DI 시스템이 의존성 그래프를 구축하기 위해:
   * - NestJS는 providers에 등록된 객체를 기반으로 의존성 그래프를 생성한다.
   * - BoardRepository를 등록하지 않으면 이 그래프가 완성되지 않아 DI 컨테이너가 BoardsService를 인스턴스화할 수 없다.
   *
   * 3. 재사용성을 높이기 위해:
   * - 모듈에서 providers로 등록된 클래스는 해당 모듈 내 어디에서나 재사용될 수 있다.
   * - BoardRepository를 등록하면 다른 서비스나 컨트롤러에서도 사용할 수 있게 된다.
   */
  providers: [BoardsService, BoardRepository],
})
export class BoardsModule {}
