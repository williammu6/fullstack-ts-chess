import { Position } from "./Position";
import { PieceColor } from "./Piece";
import { Player } from "../classes/Player";

export type Match = {
  id: number;
  whitePlayer: Player;
  blackPlayer: Player;
};

export type Move = {
  match: Match;
  from: Position;
  to: Position;
  turn: PieceColor;
};
