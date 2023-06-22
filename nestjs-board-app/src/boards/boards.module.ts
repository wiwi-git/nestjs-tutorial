import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';

@Module({
  // providers에 repository 추가했으면 된거같은데 왜 이걸 넣어야할까 빼면 어떻게 됨? 잘되네... 문제없다
  // imports: [
  //   TypeOrmModule.forFeature([Board])
  // ],
  controllers: [BoardsController],
  providers: [
    BoardsService,
    BoardRepository,
  ]
})
export class BoardsModule {}
