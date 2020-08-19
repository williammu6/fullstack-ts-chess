import { charPieces } from "../Constants";
import { PieceType, PieceName } from "@fullstack-ts-chess/shared";

const piecesOrder: string[] = [
  "ROOK",
  "KNIGHT",
  "BISHOP",
  "QUEEN",
  "KING",
  "BISHOP",
  "KNIGHT",
  "ROOK"
];

const getRowPieces = (color: "black" | "white") => {
  let row = [];
  for (const piece of piecesOrder) {
    const p: PieceType = {
      name: PieceName[piece as keyof typeof PieceName],
      color,
      moved: false,
      char: charPieces[`${color.toUpperCase()}_${piece}`]
    };
    row.push(p);
  }
  return row;
};

const flip = (board: (PieceType|null)[][]) => {

  return board.reverse()[0].map((_, index: number) => (
    board.map((row) => row[index])
  ))
};

export const flipBoard = (board: (PieceType|null)[][]) => {
  board = flip(board);
  return flip(board);
}

const getRowPawns = (color: "black" | "white"): PieceType[] => {
  return Array.from({ length: 8 }, () => ({
    name: PieceName.PAWN,
    moved: false,
    char: charPieces[`${color.toUpperCase()}_PAWN`],
    color
  }));
};

export const getInitialPosition = (): (PieceType | null)[][] => {
  let board: (PieceType | null)[][] = [];

  board.push(getRowPieces("black"));
  board.push(getRowPawns("black"));

  board.push(Array.from({ length: 8 }, () => null));
  board.push(Array.from({ length: 8 }, () => null));
  board.push(Array.from({ length: 8 }, () => null));
  board.push(Array.from({ length: 8 }, () => null));

  board.push(getRowPawns("white"));
  board.push(getRowPieces("white"));

  return board;
};

