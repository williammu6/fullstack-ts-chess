import { PieceColor } from "../types/Piece";

export class Player {
  id: string;

  color: PieceColor;

  constructor(id: string, color: PieceColor) {
    this.id = id;
    this.color = color;
  }
}
