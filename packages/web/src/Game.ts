import { PieceType } from "./types/PieceType";

type Piece = {
  type: PieceType;
  color: "black" | "white";
  moved: boolean;
};

export class Game {
  board: Piece[][] = [];

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

  getPiece = (row: number, col: number): Piece => {
    return this.board[row][col];
  };

  getValidPawnMoves = (row: number, col: number): number[][] => {
    const piece = this.getPiece(row, col);

    const direction = piece.color === "black" ? -1 : 1;

    let validMoves = [];

    if (!this.getPiece(row - direction, col))
      validMoves.push([row - direction, col]);

    if (this.getPiece(row - direction, col + 1))
      validMoves.push([row - direction, col + 1]);

    if (this.getPiece(row - direction, col - 1))
      validMoves.push([row - direction, col - 1]);

    if (!piece.moved) {
      if (!this.getPiece(row - (direction * 2), col))
        validMoves.push([row - (direction * 2), col]);
    }

    return validMoves;
  };

  getValidMoves = (row: number, col: number) => {
    const piece: Piece = this.board[row][col];

    if (!piece) return [];

    switch (piece.type) {
      case PieceType.PAWN:
        return this.getValidPawnMoves(row, col);
      default:
        return [];
    }
  };

  constructor() {
    this.newGame();
  }
}
