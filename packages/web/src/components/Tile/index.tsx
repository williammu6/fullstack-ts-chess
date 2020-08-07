import React, { ReactNode } from "react";
import clsx from "clsx";
import { Game } from "../../Game";

import { Position } from "../../types/Position";

interface Props {
  col: number;
  row: number;
  xLegend: number | null;
  yLegend: string | null;
  game: Game;
  isValid: boolean;
  isEmpty: boolean;
  children?: ReactNode;
  handleTileClick(row: number, col: number): void;
  handleMovePiece(to: Position): void;
}

const legendFont: React.CSSProperties = {
  fontSize: '0.8rem',
  fontWeight: 'bold',
};

const styleYLegend: React.CSSProperties = {
  position: 'absolute',
  top: '4px',
  left: '4px',
  zIndex:5,
};
const styleXLegend: React.CSSProperties = {
  position: 'absolute',
  bottom: '4px',
  right: '4px',
  zIndex:5
};

const Tile: React.FC<Props> = ({
  xLegend,
  yLegend,
  isValid,
  isEmpty,
  col,
  row,
  children,
  handleTileClick,
  handleMovePiece
}: Props) => {
  const isDark = (row: number, col: number) => {
    return (row + col) % 2 === 1;
  };

  const getBackground = (): string => {
    if (isValid) {
      return "bg-green-300";
    }
    return isDark(row, col) ? "bg-gray-600" : "bg-white";
  };


  const isClickable = (): boolean => {
    return !isEmpty || isValid;
  };

  const handleClick = () => {
    if (isValid) {
      handleMovePiece({ row, col });
    } else {
      handleTileClick(row, col);
    }
  };

  return (
    <div
      className={clsx(
        "relative flex-1",
        isClickable() && "cursor-pointer",
        getBackground()
      )}
      onClick={handleClick}
    >
      {children}
      <span style={{...styleYLegend, ...legendFont}}>{yLegend}</span>
      <span style={{...styleXLegend, ...legendFont}}>{xLegend}</span>
    </div>
  );
};

export default Tile;
