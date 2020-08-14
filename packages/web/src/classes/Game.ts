import { getInitialPosition, flipBoard } from "../utils/board";
import {
  PieceColor,
  PieceType,
  PieceName,
  Position,
  Match,
  Player
} from "@fullstack-ts-chess/shared";
import { socket } from "src/utils/socketUtil";

export class Game {
  player: Player;

  match: Match;

  turn: PieceColor = "white";

  board: (PieceType | null)[][] = [];

  getPiece = (row: number, col: number): PieceType | null => {
    return this.board[row][col];
  };

  canSelectPiece = (piece: PieceType | null) => {
    if (!piece) return false;
    return piece.color === this.turn && piece.color === this.player.color;
  };

  isInsideBoard = (row: number, col: number): boolean => {
    return col >= 0 && col < 8 && row >= 0 && row < 8;
  };

  canMove = (piece: PieceType, row: number, col: number): boolean => {
    if (this.isInsideBoard(row, col)) {
      const p = this.getPiece(row, col);
      return !p || p.color !== piece.color;
    }
    return false;
  };

  getDiagMoves = (piece: PieceType, row: number, col: number) => {
    let validMoves = [];

    const dirX = [1, -1, 1, -1];
    const dirY = [1, -1, -1, 1];

    for (const dx of dirX) {
      for (const dy of dirY) {
        for (let c = col, r = row; this.isInsideBoard(r, c); r += dx, c += dy) {
          if (c === col && r === row) continue;
          if (this.canMove(piece, r, c)) validMoves.push([r, c]);
          else break;
        }
      }
    }

    return validMoves;
  };

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
  };

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
  };

  getValidBishopMoves = (
    piece: PieceType,
    row: number,
    col: number
  ): number[][] => {
    return this.getDiagMoves(piece, row, col);
  };

  getValidQueenMoves = (piece: PieceType, row: number, col: number) => {
    const diagonalMoves = this.getDiagMoves(piece, row, col);
    const horizontalMoves = this.getHorizontalMoves(piece, row, col);
    const verticalMoves = this.getVerticalMoves(piece, row, col);

    return [...diagonalMoves, ...horizontalMoves, ...verticalMoves];
  };

  getValidPawnMoves = (
    piece: PieceType,
    row: number,
    col: number
  ): number[][] => {
    const direction = piece.color === "black" ? -1 : 1;

    let validMoves = [];

    if (!this.getPiece(row - direction, col))
      validMoves.push([row - direction, col]);

    let p = this.getPiece(row - direction, col + 1);
    if (p && p.color !== piece.color)
      validMoves.push([row - direction, col + 1]);

    p = this.getPiece(row - direction, col - 1);
    if (p && p.color !== piece.color) {
      validMoves.push([row - direction, col - 1]);
    }

    if (!piece.moved) {
      if (this.canMove(piece, row - direction * 2, col))
        validMoves.push([row - direction * 2, col]);
    }

    return validMoves;
  };

  getValidRookMoves = (
    piece: PieceType,
    row: number,
    col: number
  ): number[][] => {
    const horizontalMoves = this.getHorizontalMoves(piece, row, col);
    const verticalMoves = this.getVerticalMoves(piece, row, col);

    return [...horizontalMoves, ...verticalMoves];
  };

  isPlayerBlack = () => this.player.color === "black";

  getValidKnightMoves = (piece: PieceType, row: number, col: number) => {
    const possibleMoves: Position[] = [
      { row: row + 1, col: col + 2 },
      { row: row + 1, col: col - 2 },
      { row: row - 1, col: col + 2 },
      { row: row - 1, col: col - 2 },

      { row: row + 2, col: col + 1 },
      { row: row + 2, col: col - 1 },
      { row: row - 2, col: col + 1 },
      { row: row - 2, col: col - 1 }
    ];

    let validMoves = [];

    for (const move of possibleMoves) {
      if (this.canMove(piece, move.row, move.col)) {
        validMoves.push([move.row, move.col]);
      }
    }

    return validMoves;
  };

  getTurn = (): PieceColor => this.turn;

  updateBoard = (from: Position, to: Position) => {
    let movedPiece = this.board[from.row][from.col];

    if (movedPiece) {
      movedPiece.moved = true;
      this.board[to.row][to.col] = movedPiece;
      this.board[from.row][from.col] = null;
      this.turn = this.turn === "white" ? "black" : "white";
    }

    return this.board;
  };

  movePiece = (from: Position, to: Position) => {
    if (this.turn !== this.player.color) return;

    socket.emit("move_piece", {
      match: this.match,
      turn: this.turn,
      from,
      to
    });

    this.updateBoard(from, to);
  };

  getValidMoves = (piece: PieceType, row: number, col: number) => {

    if (this.isPlayerBlack()) {
      row = 7 - row;
    }

    let validMoves = [];

    switch (piece.name) {
      case PieceName.PAWN:
        validMoves = this.getValidPawnMoves(piece, row, col);
        break;
      case PieceName.BISHOP:
        validMoves = this.getValidBishopMoves(piece, row, col);
        break;
      case PieceName.QUEEN:
        validMoves = this.getValidQueenMoves(piece, row, col);
        break;
      case PieceName.ROOK:
        validMoves = this.getValidRookMoves(piece, row, col);
      break;
      case PieceName.KNIGHT:
         validMoves = this.getValidKnightMoves(piece, row, col);
      break;
      default:
        return [];
    }

    if (this.isPlayerBlack()) {
      validMoves = validMoves.map(m => {
        return [7 - m[0], m[1]]
      });
    }

    return validMoves;
  };

  init() {
    this.board = getInitialPosition();
    if (this.isPlayerBlack())
      this.board = flipBoard(this.board);
  }

  constructor(player: Player, match: Match) {
    this.player = player;
    this.match = match;
    this.init();
  }
}
