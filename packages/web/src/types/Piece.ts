export type PieceColor = "black" | "white";


export enum PieceTypes {
  PAWN = 'pawn',
  KNIGHT = 'knight',
  BISHOP = 'bishop',
  QUEEN = 'queen',
  KING = 'king',
  ROOK = 'root'
};

export interface IPiece {
  color: PieceColor,
  type: PieceTypes,
  moved: boolean,
  char: string,
};
