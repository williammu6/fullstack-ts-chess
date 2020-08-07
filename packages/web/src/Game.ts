import { PieceType } from "./types/PieceType";
import {Position} from "./types/Position";

type Piece = {
  type: PieceType;
  color: "black" | "white";
  moved: boolean;
};

export class Game {
  board: (Piece|null)[][] = [];

  newGame = (): void => {
    this.board = [
      Array.from({ length: 8 }),
      Array.from({ length: 8 }, () => ({
        type: PieceType.PAWN,
        color: "black",
        moved: false
      })),
      Array.from({ length: 8 }),
      Array.from({ length: 8 }),
      Array.from({ length: 8 }),
      Array.from({ length: 8 }),
      Array.from({ length: 8 }, () => ({
        type: PieceType.PAWN,
        color: "white",
        moved: false
      })),
      Array.from({ length: 8 })
    ] as Piece[][];
  };

  getPiece = (row: number, col: number): Piece | null => {
    return this.board[row][col];
  };

  getValidPawnMoves = (piece: Piece, row: number, col: number): number[][] => {
    const direction = piece.color === "black" ? -1 : 1;

    let validMoves = [];

    if (!this.getPiece(row - direction, col))
      validMoves.push([row - direction, col]);

    if (col !== 7 && this.getPiece(row - direction, col + 1))
      validMoves.push([row - direction, col + 1]);

    if (col !== 0 && this.getPiece(row - direction, col - 1))
      validMoves.push([row - direction, col - 1]);

    if (!piece.moved) {
      if (!this.getPiece(row - (direction * 2), col))
        validMoves.push([row - (direction * 2), col]);
    }

    return validMoves;
  };

  movePiece = (from: Position, to: Position) => {
    this.board[from.row][from.col]!.moved = true;
    this.board[to.row][to.col] = this.board[from.row][from.col];
    this.board[from.row][from.col] = null;
  };

  getValidMoves = (piece: Piece, row: number, col: number) => {
    switch (piece.type) {
      case PieceType.PAWN:
        return this.getValidPawnMoves(piece, row, col);
      default:
        return [];
    }
  };

  constructor() {
    this.newGame();
  }
}
