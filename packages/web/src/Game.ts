import { Position } from "./types/Position";
import { charPieces, getInitialPosition } from "./Constants";
import { IPiece, PieceTypes } from "./types/Piece";

export class Game {
  board: (IPiece | null)[][] = [];

  newGame = (): void => {
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

  movePiece = (from: Position, to: Position) => {
    this.board[from.row][from.col]!.moved = true;
    this.board[to.row][to.col] = this.board[from.row][from.col];
    this.board[from.row][from.col] = null;
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
    this.newGame();
  }
}
