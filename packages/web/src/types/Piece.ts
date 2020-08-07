export enum PieceTypes {
  PAWN = 'pawn',
  KNIGHT = 'knight',
  BISHOP = 'bishop',
  QUEEN = 'queen',
  KING = 'king',
  ROOK = 'root'
};

export interface IPiece {
  color: "black" | "white",
  type: PieceTypes,
  moved: boolean,
  char: string,
};
