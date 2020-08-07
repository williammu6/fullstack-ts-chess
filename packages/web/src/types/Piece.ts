export type PieceColor = "black" | "white";


export enum PieceName {
  PAWN = 'pawn',
  KNIGHT = 'knight',
  BISHOP = 'bishop',
  QUEEN = 'queen',
  KING = 'king',
  ROOK = 'root'
};

export type PieceType = {
  color: PieceColor,
  name: PieceName,
  moved: boolean,
  char: string,
};
