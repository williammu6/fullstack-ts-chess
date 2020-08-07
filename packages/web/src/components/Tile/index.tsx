import React, { ReactNode } from "react";
import clsx from "clsx";
import { Game } from "../../Game";

interface Props {
  col: number;
  row: number;
  game: Game;
  valid: boolean;
  children?: ReactNode;
  handleTileClick(row: number, col: number): void;
}

const Tile: React.FC<Props> = ({
  game,
  valid,
  col,
  row,
  children,
  handleTileClick
}: Props) => {
  const isDark = (row: number, col: number) => {
    return (row + col) % 2 === 1;
  };

  const getBackground = (): string => {
    if (valid) {
      return "bg-green-300";
    }
    return isDark(row, col) ? "bg-gray-600" : "bg-white";
  };

  const isEmpty = () => {
    return !game.board[row][col];
  };

  const isClickable = (): boolean => {
    return !isEmpty() || valid;
  };

  return (
    <div
      className={clsx(
        "relative flex-1",
        isClickable() && "cursor-pointer",
        getBackground()
      )}
      onClick={() => handleTileClick(row, col)}
    >
      {children}
    </div>
  );
};

export default Tile;
