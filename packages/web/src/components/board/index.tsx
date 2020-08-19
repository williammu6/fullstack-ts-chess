import React, { ReactNode, useState, useEffect } from "react";

import Tile from "../Tile";

import Piece from "../Piece";

import { Game } from "src/classes/Game";

import { Position, Move } from "@fullstack-ts-chess/shared";

import { socket } from "src/utils/socketUtil";

import "./styles.css";

type Props = {
  game: Game;
  children?: ReactNode;
};

const Board: React.FC<Props> = ({ game }: Props) => {
  const [validMoves, setValidMoves] = useState<number[][]>([]);

  const [board, setBoard] = useState(game.board);

  const updateBoard = ({ from, to }: Move) => {
    setBoard(() => {
      const newBoard = game.updateBoard(from, to);
      return [...newBoard];
    });
  };

  useEffect(() => {
    socket.on("update_board", updateBoard);
  });

  const [
    selectedPiecePosition,
    setSelectedPiecePosition
  ] = useState<Position | null>();

  const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];

  const handleTileClick = (row: number, col: number) => {
    const piece = game.getPiece(row, col);
    if (piece && game.canSelectPiece(piece)) {
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
      return (
        <Piece
          handleTileClick={(row, col) => handleTileClick(row, col)}
          row={row}
          col={col}
          piece={piece}
        />
      );
    return null;
  };

  const getXLegend = (row: number, col: number) => {
    if (row === 7) {
      if (game.isPlayerBlack()) col = 7 - col;
      return letters[col];
    }
    return null;
  };
  const getYLegend = (row: number, col: number) => {
    if (col === 0) {
      if (game.isPlayerBlack()) row = 7 - row;
      return 8 - row;
    }
    return null;
  };

  return (
    <div className="flex">
      <div className="border-solid border-4 border-gray-700 board">
        {board.map((rows, row) => (
          <div key={row} className="flex flex-row row">
            {rows.map((_, col) => (
              <Tile
                xLegend={getXLegend(row, col)}
                yLegend={getYLegend(row, col)}
                key={col}
                row={row}
                side={game.player.color}
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
