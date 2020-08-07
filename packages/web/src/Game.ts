import { Position } from "./types/Position";
import { PieceType, PieceName, PieceColor } from "./types/Piece";
import { getInitialPosition } from "./utils/board";


export class Game {
  turn: PieceColor = "black";

  board: (PieceType | null)[][] = [];

  newGame = (): void => {
    this.turn = "white";
    this.board = getInitialPosition();

    /*
    this.board = [
      Array.from({ length: 8 }, () => null),
      Array.from({ length: 8 }, () => null),
      Array.from({ length: 8 }, () => null),
      Array.from({ length: 8 }, () => null),
      Array.from({ length: 8 }, () => null),
      Array.from({ length: 8 }, () => null),
      Array.from({ length: 8 }, () => null),
      Array.from({ length: 8 }, () => null),
    ];

    this.board[5][5] = {
      type: PieceTypes.BISHOP,
      color: "white",
      moved: false,
      char: 'L'
    };
    */
  };

  getPiece = (row: number, col: number): PieceType | null => {
    return this.board[row][col];
  };

  isInsideBoard = (row: number, col: number): boolean => {
    return col >= 0 && col < 8 && row >= 0 && row < 8;
  }



  getDiagMoves = (piece: PieceType, row: number, col: number) => {
    let validMoves = [];

    for (const dir of [1, -1]) {
      for (let c = col, r = row; this.isInsideBoard(r, c); c+= dir, r += dir) {
        if (c === col && r === row) continue;
        if (this.canMove(piece, r, c))
          validMoves.push([r, c]);
        else break;
      }
    }
    for (let c = col, r = row; this.isInsideBoard(r, c); r++, c--) {
      if (c === col && r === row) continue;
      if (this.canMove(piece, r, c))
        validMoves.push([r, c]);
      else break;
    }

    for (let c = col, r = row; this.isInsideBoard(r, c); r--, c++) {
      if (c === col && r === row) continue;
      if (this.canMove(piece, r, c))
        validMoves.push([r, c]);
      else break;
    }

    return validMoves;
  };

  canMove = (piece: PieceType, row: number, col: number): boolean => {
    if (this.isInsideBoard(row, col)) {
      const p= this.getPiece(row, col);
      return !p || p.color !== piece.color;
    }
    return false;
  }

  getVerticalMoves = (piece: PieceType, row: number, col: number) => {
    let validMoves = [];

    const directions = [1, -1];

    for (const direction of directions) {
      for (let c = col; this.isInsideBoard(row, c); c += direction) {
        if (c === col) continue;
        if (this.canMove(piece, row, c)) {
          validMoves.push([row, c]);
        } else break;
      }
    }
    return validMoves;
  }

  getHorizontalMoves = (piece: PieceType, row: number, col: number) => {
    let validMoves = [];

    const directions = [1, -1];

    for (const direction of directions) {
      for (let r = row; this.isInsideBoard(r, col); r += direction) {
        if (r === row) continue;
        if (this.canMove(piece, r, col)) {
          validMoves.push([r, col]);
        } else break;
      }
    }
    return validMoves;
  }

  getValidBishopMoves = (piece: PieceType, row: number, col: number): number[][] => {
    return this.getDiagMoves(piece, row, col);
  };

  getValidQueenMoves = (piece:PieceType, row: number, col: number) => {
    const diagonalMoves = this.getDiagMoves(piece, row, col);
    const horizontalMoves = this.getHorizontalMoves(piece, row, col);
    const verticalMoves = this.getVerticalMoves(piece, row, col);

    return [
      ...diagonalMoves,
      ...horizontalMoves,
      ...verticalMoves,
    ];
  };

  getValidPawnMoves = (piece: PieceType, row: number, col: number): number[][] => {
    const direction = piece.color === "black" ? -1 : 1;

    let validMoves = [];

    if (!this.getPiece(row - direction, col))
      validMoves.push([row - direction, col]);

    let p = this.getPiece(row - direction, col + 1);
    if (p && p.color !== piece.color)
      validMoves.push([row - direction, col + 1]);

    p = this.getPiece(row - direction, col - 1);
    if (p && p.color !== piece.color)
      validMoves.push([row - direction, col - 1]);

    if (!piece.moved) {
      if (this.canMove(piece, row - direction * 2, col - 1))
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
    // this.turn = this.turn === "white" ? "black" : "white";
  };

  getValidMoves = (piece: PieceType, row: number, col: number) => {
    switch (piece.name) {
      case PieceName.PAWN:
        return this.getValidPawnMoves(piece, row, col);
      case PieceName.BISHOP:
        return this.getValidBishopMoves(piece, row, col);
      case PieceName.QUEEN:
        return this.getValidQueenMoves(piece, row, col);
      default:
        return [];
    }
  };

  constructor() {
    this.newGame();
  }
}
