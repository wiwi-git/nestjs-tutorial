import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository,
    ){}
    async getAllBoards(user: User): Promise<Board[]> {
        // -- ex queryBuilder
        /*
        const query = this.boardRepository.createQueryBuilder('board')
        query.where('board.userId = :userId', { userId: user.id })
        const boards = await query.getMany();
        return boards
        */

        return this.boardRepository.find({
            where: {
                user: {
                    id: user.id
                }
            },
        })

    }

    createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto, user);
    }

    async getBoardById(id: number): Promise<Board> {
        const found = await this.boardRepository.findOne({
            where: {id}
        });
        if(!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }

        return found;
    
    }

    async deleteBoard(id: number, user: User): Promise<void> {
        const query = this.boardRepository.createQueryBuilder('board')
            .delete()
            .from(Board)
            .where("id = :id", { id: id })
            .andWhere("userId = :userId", { userId: user.id})
        const result = await query.execute()

        if (result.affected === 0) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);
        board.status = status;
        await this.boardRepository.save(board)
        return board;
    }

    // updateBoardStatus(id: string, status: BoardStatus): Board {
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    //     // const index = this.boards.findIndex( (board) => board.id === id);
    //     // this.boards[index].status = status;
    // }
}
