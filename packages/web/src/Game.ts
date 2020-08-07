import { Position } from "./types/Position";
import { IPiece, PieceTypes, PieceColor } from "./types/Piece";
import { getInitialPosition } from "./utils/board";


export class Game {
  turn: PieceColor = "white";

  board: (IPiece | null)[][] = [];

  newGame = (): void => {
    this.turn = "white";
    this.board = getInitialPosition();
  };

  getPiece = (row: number, col: number): IPiece | null => {
    return this.board[row][col];
  };

  getValidPawnMoves = (piece: IPiece, row: number, col: number): number[][] => {
    const direction = piece.color === "black" ? -1 : 1;

    let validMoves = [];

    if (!this.getPiece(row - direction, col))
      validMoves.push([row - direction, col]);

    if (col !== 7 && this.getPiece(row - direction, col + 1))
      validMoves.push([row - direction, col + 1]);

    if (col !== 0 && this.getPiece(row - direction, col - 1))
      validMoves.push([row - direction, col - 1]);

    if (!piece.moved) {
      if (!this.getPiece(row - direction * 2, col))
        validMoves.push([row - direction * 2, col]);
    }

    return validMoves;
  };

  getTurn = (): PieceColor => this.turn;

  movePiece = (from: Position, to: Position) => {
    let movedPiece = this.board[from.row][from.col];
    movedPiece!.moved = true;
    this.board[to.row][to.col] = movedPiece;
    this.board[from.row][from.col] = null;
    this.turn = this.turn === "white" ? "black" : "white";
  };

  getValidMoves = (piece: IPiece, row: number, col: number) => {
    switch (piece.type) {
      case PieceTypes.PAWN:
        return this.getValidPawnMoves(piece, row, col);
      default:
        return [];
    }
  };

  constructor() {
    console.log("constructor");
    this.newGame();
  }
}
