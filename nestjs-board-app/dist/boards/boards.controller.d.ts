import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './board.model';
import { CreateBoardDto } from './dto/create-board.dto';
export declare class BoardsController {
    private boardsService;
    constructor(boardsService: BoardsService);
    getAllBoard(): Board[];
    createBoard(createboardDto: CreateBoardDto): Board;
    getBoardById(id: string): Board;
    deleteBoard(id: string): void;
    updateBoardStatus(id: string, status: BoardStatus): Board;
}
