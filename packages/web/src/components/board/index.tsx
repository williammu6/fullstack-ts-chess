import React, { ReactNode, useState } from "react";

import { Position } from "../../types/Position";

import Tile from "../Tile";

import { Game } from "../../Game";

import Piece from "../Piece";

import "./styles.css";

type Props = {
  game: Game;
  children?: ReactNode;
};

const Board: React.FC<Props> = ({ game }: Props) => {
  const [validMoves, setValidMoves] = useState<number[][]>([]);

  const [
    selectedPiecePosition,
    setSelectedPiecePosition
  ] = useState<Position | null>();

  const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];

  const handleTileClick = (row: number, col: number) => {
    const piece = game.getPiece(row, col);
    if (piece /*&& piece.color === game.getTurn() */) {
      setSelectedPiecePosition({ row, col });
      const validMoves = game.getValidMoves(piece, row, col);
      setValidMoves(validMoves);
    }
  };

  const handleMovePiece = (to: Position): void => {
    if (selectedPiecePosition) {
      game.movePiece(selectedPiecePosition, to);
      setSelectedPiecePosition(null);
      setValidMoves([]);
    }
  };

  const isValidTile = (row: number, col: number): boolean => {
    return !!validMoves.find(m => m[0] === row && m[1] === col);
  };

  const isEmpty = (row: number, col: number) => {
    return !game.board[row][col];
  };

  const getPiece = (row: number, col: number) => {
    const piece = game.getPiece(row, col);
    if (piece)
      return <Piece piece={piece} />;
    return null;
  };

  return (
    <div className="flex">
      <div className="border-solid border-4 border-gray-700 board">
        {Array.from({ length: 8 }).map((_, row) => (
          <div key={row} className="flex flex-row row">
            {Array.from({ length: 8 }).map((_, col) => (
              <Tile
                xLegend={row === 7 ? letters[col] : null}
                yLegend={col === 0 ? 8 - row : null}
                game={game}
                key={col}
                row={row}
                col={col}
                isEmpty={isEmpty(row, col)}
                isValid={isValidTile(row, col)}
                handleTileClick={handleTileClick}
                handleMovePiece={handleMovePiece}
              >
                {getPiece(row, col)}
              </Tile>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
