import React, { ReactNode, useState } from "react";

import Tile from "../Tile";

import Pawn from "../Pieces/Pawn";

import "./styles.css";
import { Game } from "../../Game";
import { PieceType } from "../../types/PieceType";

type Props = {
  game: Game;
  children?: ReactNode;
};

const Board: React.FC<Props> = ({ game }: Props) => {
  const [validMoves, setValidMoves] = useState<number[][]>([]);

  const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];

  const getPiece = (row: number, col: number) => {
    const piece = game.board[row][col];

    if (piece) {
      switch (piece.type) {
        case PieceType.PAWN:
          return <Pawn color={piece.color} />;
        default:
          return null;
      }
    }
    return null;
  };

  const handleTileClick = (row: number, col: number) => {
    const validMoves = game.getValidMoves(row, col);
    setValidMoves(validMoves);
  };

  const isValidTile = (row: number, col: number): boolean => {
    return !!validMoves.find(m => m[0] === row && m[1] === col);
  };

  return (
    <div>
      <div className="flex">
        <div className="flex font-bold flex-col items-center justify-around w-4 ">
          {Array.from({ length: 8 }).map((_, row) => (
            <div key={row} className="flex-initial">
              <h1>{8 - row}</h1>
            </div>
          ))}
        </div>
        <div className="border-solid border-4 border-gray-700 board">
          {Array.from({ length: 8 }).map((_, row) => (
            <div key={row} className="flex flex-row row">
              {Array.from({ length: 8 }).map((_, col) => (
                <Tile
                  key={col}
                  game={game}
                  row={row}
                  col={col}
                  valid={isValidTile(row, col)}
                  handleTileClick={handleTileClick}
                >
                  {getPiece(row, col)}
                </Tile>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex ml-4 font-bold flex-row items-center justify-around">
        {letters.map(letter => (
          <div key={letter} className="flex-initial">
            <h1>{letter}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
