import { charPieces } from "../Constants";
import { IPiece, PieceTypes } from "../types/Piece";

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

const getRowMajorPieces = (color: "black" | "white") => {
  let row = [];
  for (const piece of piecesOrder) {
    const p: IPiece = {
      type: PieceTypes[piece as keyof typeof PieceTypes],
      color,
      moved: false,
      char: charPieces[`${color.toUpperCase()}_${piece}`]
    };
    row.push(p);
  }
  return row;
};

const getRowPawns = (color: "black" | "white"): IPiece[] => {
  return Array.from({ length: 8 }, () => ({
    type: PieceTypes.PAWN,
    moved: false,
    char: charPieces[`${color.toUpperCase()}_PAWN`],
    color
  }));
};

export const getInitialPosition = (): (IPiece | null)[][] => {
  let board: (IPiece | null)[][] = [];

  const emptyRow = Array.from({ length: 8 }, () => null);

  board.push(getRowMajorPieces("black"));
  board.push(getRowPawns("black"));

  board.push(emptyRow);
  board.push(emptyRow);
  board.push(emptyRow);
  board.push(emptyRow);

  board.push(getRowPawns("white"));
  board.push(getRowMajorPieces("white"));

  return board;
};
